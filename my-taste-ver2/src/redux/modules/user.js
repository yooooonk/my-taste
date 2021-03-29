import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import firebase from 'firebase/app';
import { auth } from '../../shared/firebase';

// initialState
const initialState = {
  userInfo: null,
  isLogin: false,
  isIdMultiple: false
};

// actions
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const SET_IS_ID_MULTIPLE = 'SET_IS_ID_MULTIPLE';

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const setIsIdMultiple = createAction(SET_IS_ID_MULTIPLE, (isMultiple) => ({
  isMultiple
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
            dispatch(setIsIdMultiple(false));
            /* dispatch(
              setUser({
                user_name: nickname,
                id: id,
                user_profile: '',
                uid: user.user.uid
              })
            );
 */
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
          dispatch(setIsIdMultiple(true));
        }

        console.error(errorCode, errorMessage);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        //setCookie('isLogin', 'success');
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        //deleteCookie('isLogin');
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [setIsIdMultiple]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.isMultiple);
        draft.isIdMultiple = action.payload.isMultiple;
      })
  },
  initialState
);
// action creator export
const actionCreators = {
  signupFB
};

export { actionCreators };
