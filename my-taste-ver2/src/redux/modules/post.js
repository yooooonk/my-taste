import { createReducer, createAction } from '@reduxjs/toolkit';
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
  paging: { start: null, next: null, size: 6 },
  is_loading: false,
  randomPhrases: [
    '지키는 일이다. 지켜보는 일이다. 사랑한다는 것은',
    '살아온 기적이 살아갈 기적이 된다고 사노라면 많은 기쁨이 있다고',
    '씨앗처럼 정지하라 꽃은 멈춤의 힘으로 피어난다',
    '친절과 빛과 삶과 공감의 확대'
  ]
};

// actions
const setPost = createAction('post/SET_POST');

const addPost = createAction('post/ADD_POST');
const editPost = createAction('post/EDIT_POST');
const deletePost = createAction('post/DELETE_POST');
const loading = createAction('post/LOADING');
const setRandomPhrase = createAction('post/SET_RANDOM_PHRASE');

// reducer
const postReducer = createReducer(initialState, {
  [setPost]: (state, { payload }) => {
    state.list = [...state.list, ...payload.post];

    state.list = state.list.reduce((acc, cur) => {
      let idx = acc.findIndex((acc) => acc.id === cur.id);
      if (idx === -1) {
        return [...acc, cur];
      } else {
        acc[idx] = cur;
        return acc;
      }
    }, []);

    if (payload.paging) {
      state.paging = payload.paging;
    }

    state.is_loading = false;
  },
  [addPost]: (state, { payload }) => {
    state.list.unshift(payload);
    state.is_loading = false;
  },
  [editPost]: (state, { payload }) => {
    let idx = state.list.findIndex((p) => p.id === payload.postId);

    state.list[idx] = { ...state.list[idx], ...payload.post };
  },
  [deletePost]: (state, { payload }) => {
    state.list = state.list.filter((p) => p.id !== payload);
  },
  [loading]: (state, { payload }) => {
    state.is_loading = payload;
  },
  [setRandomPhrase]: (state, { payload }) => {
    state.randomPhrases = [...state.randomPhrases, ...payload];
  }
});

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
        basketId,
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

      const status = { postId: doc.id };
      dispatch(bookActions.fetchUpdateBookBasket(basketId, status));

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

      if (preview === post.image_url) {
        // 사진수정 x
        const res = await postAPI.updatePost(postId, post);

        dispatch(editPost({ postId, post }));
      } else {
        // 사진수정할경우
        const user_id = getState().user.user.uid;
        const snapshot = imageAPI.uploadImage(
          `images/${user_id}_${new Date().getTime()}`,
          preview
        );
        const url = snapshot.ref.getDownloadURL();

        const newPostData = { ...post, image_url: url };
        const res = await postAPI.updatePost(postId, newPostData);
        dispatch(editPost({ postId, post: newPostData }));
      }

      history.replace('/feed');
    } catch (error) {
      alert('게시글 수정에 실패했습니다');
      console.error(error);
    }
  };

const fetchDeletePost =
  (postId, basketId) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await postAPI.deletePost(postId);

      dispatch(deletePost(postId));

      dispatch(bookActions.fetchUpdateBookBasket(basketId, { postId: null }));

      history.replace('/feed');
    } catch (error) {
      alert('삭제에 실패했습니다');
      console.error(error);
    }
  };

const fetchPosts =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      let { start, next, size } = getState().post.paging;

      if (start && !next) {
        return;
      }

      dispatch(loading(true));

      const docs = await postAPI.getPosts(next, size);

      let paging = {
        start: docs.docs[0],
        next:
          docs.docs.length === size + 1
            ? docs.docs[docs.docs.length - 1]
            : null,
        size: size
      };

      let post_list = [];

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

      dispatch(setPost({ paging, post: post_list }));
    } catch (error) {
      console.error(error);
    }
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

      dispatch(setPost({ post, paging: null }));
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

      dispatch(editPost({ postId, post: { ...post, likers: likers } }));

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
      dispatch(editPost({ postId, post: { ..._post, likers: likers } }));
    } catch (error) {
      console.error(error);
    }
  };

const fetchRandomPhrase =
  (postId = null) =>
  async (dispatch, getState, { history }) => {
    try {
      const docs = await postAPI.getRandomPost();

      let phraseList = [];
      docs.forEach((p) => {
        phraseList.push(...p.data().phraseList);
      });

      dispatch(setRandomPhrase(phraseList));
    } catch (error) {
      console.error(error);
    }
  };

// action creator export
const postActions = {
  addPost,
  editPost,
  fetchCreatePost,
  fetchPosts,
  fetchPost,
  fetchUpdatePost,
  fetchDeletePost,
  likePostFB,
  unlikePostFB,
  fetchRandomPhrase
};

export { postActions };
export default postReducer;
