import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore, storage } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';
import 'moment';
import moment from 'moment';

// initialState
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false
};
// actions
const ADD_POST = 'ADD_POST';

// action creators
const addPost = createAction(ADD_POST, (post) => ({ post }));

// middleware actions
const initialPost = {
  image_url:
    'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/camera.png?alt=media&token=212104aa-9013-45dd-9478-4914cf9f54cf',
  comment_cnt: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
};
const addPostFB = (contents, phraseList) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile
    };

    const _post = {
      ...initialPost,
      contents,
      phraseList,
      comment_cnt: 0,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
    };

    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, 'data_url');

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace('/');

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert('앗! 포스트 작성에 문제가 있어요!');
              console.log('post 작성에 실패했어요!', err);
            });
        })
        .catch((err) => {
          window.alert('앗! 이미지 업로드에 문제가 있어요!');
          console.log('앗! 이미지 업로드에 문제가 있어요!', err);
        });
    });
  };
};

// reducer
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        produce(state, (draft) => {
          draft.list.unshift(action.payload.post);
        });
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  addPostFB
};

export { actionCreators };
