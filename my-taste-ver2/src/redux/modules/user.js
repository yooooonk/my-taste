import { createReducer, createAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import firebase from 'firebase/app';
import { auth } from '../../shared/firebase';
import { imageAPI, userAPI } from '../../api';

// initialState
const initialState = {
  user: null,
  isLogin: false,
  loginError: {
    isError: false,
    msg: ''
  }
};

// action creators
const setUser = createAction('user/SET_USER');
const logOut = createAction('user/LOG_OUT');
const setAuthError = createAction('user/SET_AUTH_ERROR');

// reducer
const userReducer = createReducer(initialState, {
  [setUser]: (state, { payload }) => {
    state.user = payload;
    state.isLogin = true;
    state.loginError = { isError: false, msg: '' };
  },
  [logOut]: (state, { payload }) => {
    state.user = null;
    state.isLogin = false;
  },
  [setAuthError]: (state, { payload }) => {
    state.loginError = payload;
  }
});

// middleware
const signup =
  (id, nickname, pw) =>
  async (dispatch, getState, { history }) => {
    try {
      await userAPI.createUser(id, pw);

      const defaultUrl =
        'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/noImage.png?alt=media&token=fc22498a-b954-42db-9683-5a958795adb0';
      const user = await userAPI.updateProfile(nickname, defaultUrl);

      dispatch(
        setAuthError({
          isError: false,
          msg: ''
        })
      );
      dispatch(login(id, pw));
      history.replace('/');
    } catch (error) {
      console.error(error);

      if (error.code === 'auth/email-already-in-use') {
        dispatch(
          setAuthError({
            isError: true,
            msg: '이미 사용중인 이메일입니다'
          })
        );
      }
    }
  };

const login =
  (id, pw) =>
  async (dispatch, getstate, { history }) => {
    try {
      await userAPI.setLoginPersistence();
      const user = await userAPI.login(id, pw);

      dispatch(
        setUser({
          user_name: user.user.displayName,
          id: id,
          user_profile: '',
          uid: user.user.uid
        })
      );

      history.push('/');
    } catch (error) {
      console.error(error);
      const code = error.code;

      const msg = {
        'auth/invalid-email': '가입하지 않은 이메일입니다',
        'auth/user-not-found': '가입하지 않은 이메일입니다',
        'auth/wrong-password': '비밀번호를 확인해주세요',
        'auth/too-many-requests':
          '로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.'
      };
      if (!Object.keys(msg).includes(code)) return;
      dispatch(
        setAuthError({
          isError: true,
          msg: msg[code]
        })
      );
    }
  };

const checkLogin =
  () =>
  async (dispatch, getState, { history }) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: '',
            id: user.email,
            uid: user.uid
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };

const logout =
  () =>
  async (dispatch, getState, { history }) => {
    await userAPI.logout();

    dispatch(logOut());
    history.replace('/');
  };

const updateProfile = (userName) => {
  return async (dispatch, getState, { history }) => {
    try {
      const user = getState().user.user;

      const preview = getState().image.preview;

      let url = '';
      if (preview) {
        const snapshot = await imageAPI.uploadImage(
          `images/${user.id}_${new Date().getTime()}`,
          preview
        );

        url = await snapshot.ref.getDownloadURL();
      }
      console.log(url);
      const result = await userAPI.updateProfile(userName, url);
      dispatch(
        setUser({
          user_name: userName,
          user_profile: url,
          id: user.id,
          uid: user.uid
        })
      );
      alert('수정했습니다');
      console.log('업데이트', result);
    } catch (error) {
      console.error(error);
    }
  };
};
// action creator export
const userActions = {
  signup,
  login,
  checkLogin,
  logout,
  updateProfile
};

export { userActions };
export default userReducer;
