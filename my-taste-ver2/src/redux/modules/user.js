import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import firebase from 'firebase/app';
import { auth } from '../../shared/firebase';

// initialState
const initialState = {
  userInfo: null,
  isLogin: false,
  fbAuthError: {
    isError: false,
    msg: ''
  }
};

// actions
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const SET_FB_AUTH_ERROR = 'SET_FB_AUTH_ERROR';

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const setFbAuthError = createAction(SET_FB_AUTH_ERROR, (authError) => ({
  authError
}));

// middleware
const signupFB = (id, nickname, pw) => {
  return function (dispatch, getState, { history }) {
    console.log(id, nickname, pw);
    auth
      .createUserWithEmailAndPassword(id, pw)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: nickname
          })
          .then(() => {
            dispatch(
              setFbAuthError({
                isError: false,
                msg: ''
              })
            );

            history.push('/login');
          })
          .catch((error) => {
            console.log(error.code);
            console.error(error.code);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          dispatch(
            setFbAuthError({
              isError: true,
              msg: '이미 사용중인 이메일입니다'
            })
          );
        }

        console.error(errorCode, errorMessage);
      });
  };
};

const loginFB = (id, pw) => {
  return function (dispatch, getstate, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pw)
        .then((user) => {
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: '',
              uid: user.user.uid
            })
          );

          history.push('/');
        })
        .catch((error) => {
          let errorCode = error.code;
          console.error(error.code);
          if (errorCode === 'auth/invalid-email') {
            return dispatch(
              setFbAuthError({
                isError: true,
                msg: '가입되어 있지 않은 이메일입니다'
              })
            );
          }
          if (errorCode === 'auth/wrong-password') {
            return dispatch(
              setFbAuthError({
                isError: true,
                msg: '비밀번호를 확인해주세요'
              })
            );
          }
        });
    });
  };
};
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
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
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
        draft.fbAuthError = { isError: false, msg: '' };
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SET_FB_AUTH_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.fbAuthError = action.payload.authError;
      })
  },
  initialState
);
// action creator export
const actionCreators = {
  signupFB,
  loginFB,
  loginCheckFB
};

export { actionCreators };
