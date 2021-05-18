import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore, storage, realtime } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';
import 'moment';
import moment from 'moment';
import { bookActions } from './book';
import { imageAPI, notiAPI, postAPI } from '../../api';

// initialState
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false
};
// actions
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_POST = 'SET_POST';
const EDIT_POST = 'EDIT_POST';
const LOADING = 'LOADING';

// action creators
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging
}));
const loading = createAction(LOADING, (is_loading) => ({
  is_loading
}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post
}));
// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        // 중복처리
        draft.list = draft.list.reduce((acc, cur) => {
          let idx = acc.findIndex((acc) => acc.id === cur.id);
          if (idx === -1) {
            return [...acc, cur];
          } else {
            acc[idx] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.postId);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

// middleware actions
const initialPost = {
  image_url:
    'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/camera.png?alt=media&token=212104aa-9013-45dd-9478-4914cf9f54cf',
  comment_cnt: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
};
const fetchCreatePost =
  (basketId, contents, phraseList) =>
  async (dispatch, getState, { history }) => {
    try {
      const _user = getState().user.user;
      // user 정보
      const user_info = {
        user_name: _user.user_name,
        user_id: _user.uid,
        user_profile: _user.user_profile
      };

      // post 내용
      const _post = {
        ...initialPost,
        contents,
        phraseList,
        likers: [],
        comment_cnt: 0,
        insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
      };

      // 사진
      const preview = getState().image.preview;
      let url;

      if (preview.indexOf('https') > -1) {
        // 사진이 기본제공 썸네일이면 url 바로저장
        url = preview;
      } else {
        // 파일일 때는 storage에 저장
        const snapshot = await imageAPI.uploadImage(
          `images/${user_info.user_id}_${new Date().getTime()}`,
          preview
        );

        url = await snapshot.ref.getDownloadURL();
      }

      //
      const doc = await postAPI.createPost({
        ...user_info,
        ..._post,
        image_url: url
      });

      const post = { user_info, ..._post, id: doc.id, image_url: url };
      dispatch(addPost(post));

      if (basketId) {
        dispatch(bookActions.fetchUpdateIsWrite(basketId, doc.id));
      }

      history.replace('/basket');

      dispatch(imageActions.setPreview(null));
    } catch (error) {
      alert('게시글 작성 에러');
      console.error(error);
    }
  };

const fetchUpdatePost =
  (postId = null, post = {}) =>
  async (dispatch, getState, { history }) => {
    try {
      if (!postId) {
        console.log('게시물 정보가 없어요!');
        return;
      }

      const preview = getState().image.preview;

      const postIdx = getState().post.list.findIndex((p) => p.id === postId);
      const post = getState().post.list[postIdx];

      if (preview === post.image_url) {
        const res = await postAPI.updatePost(postId, post);

        dispatch(editPost(postId, { ...post }));
        history.replace('/');
      } else {
        const user_id = getState().user.user.uid;
        const snapshot = imageAPI.uploadImage(
          `images/${user_id}_${new Date().getTime()}`,
          preview
        );
        const url = snapshot.ref.getDownloadURL();
        const res = await postAPI.updatePost(postId, {
          ...post,
          image_url: url
        });
        dispatch(editPost(postId, { ...post, image_url: url }));
        history.replace('/');
      }
    } catch (error) {
      alert('게시글 수정에 실패했습니다');
      console.error(error);
    }
  };

const fetchDeletePost =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await postAPI.deletePost(postId);
      dispatch(deletePost(postId));
      history.replace('/');
    } catch (error) {
      alert('삭제에 실패했습니다');
      console.error(error);
    }
  };

const fetchPosts =
  (start = null, size = 3) =>
  async (dispatch, getState, { history }) => {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));

    const docs = await postAPI.getPosts(start, size);

    let post_list = [];

    let paging = {
      start: docs.docs[0],
      next:
        docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
      size: size
    };

    docs.forEach((doc) => {
      let _post = doc.data();

      // ['commenct_cnt', 'contents', ..]
      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf('user_') !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] }
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );

      post_list.push(post);
    });
    post_list.pop();

    dispatch(setPost(post_list, paging));
  };

const fetchPost =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await postAPI.getPost(id);

      const postData = res.data();
      let post = Object.keys(postData).reduce(
        (acc, cur) => {
          if (cur.indexOf('user_') !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: postData[cur] }
            };
          }
          return { ...acc, [cur]: postData[cur] };
        },
        { id: res.id, user_info: {} }
      );

      dispatch(setPost([post]), {});
    } catch (error) {
      alert('포스트를 읽어오는데 실패했습니다');
      console.error(error);
    }
  };

const likePostFB =
  (postId = null) =>
  async (dispatch, getState, { history }) => {
    try {
      if (!postId) return;
      const post = getState().post.list.find((p) => p.id === postId);
      const myId = getState().user.user.uid;
      const myName = getState().user.user.user_name;
      const likers = [...post.likers, myId];

      const res = postAPI.updatePost(postId, {
        likers: likers
      });

      dispatch(editPost(postId, { ...post, likers: likers }));

      const _noti_item = await notiAPI.pushNoti(
        `noti/${post.user_info.user_id}/list`
      );

      await _noti_item.set({
        post_id: post.id,
        user_name: myName,
        image_url: post.image_url,
        insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
        type: 'like'
      });

      const notiRes = notiAPI.updateNoti(`noti/${post.user_info.user_id}`, {
        read: false
      });
    } catch (error) {
      console.error(error);
    }
  };

const unlikePostFB =
  (postId = null) =>
  async (dispatch, getState, { history }) => {
    try {
      if (!postId) return;
      const _post = getState().post.list.find((p) => p.id === postId);
      const myId = getState().user.user.uid;

      const likers = _post.likers.filter((i) => i !== myId);
      const res = await postAPI.updatePost(postId, { likers });
      dispatch(editPost(postId, { ..._post, likers: likers }));
    } catch (error) {
      console.error(error);
    }
  };

// action creator export
const actionCreators = {
  addPost,
  editPost,
  fetchCreatePost,
  fetchPosts,
  fetchPost,
  fetchUpdatePost,
  fetchDeletePost,
  likePostFB,
  unlikePostFB
};

export { actionCreators };
