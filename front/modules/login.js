import {createReducer, createAction} from '@reduxjs/toolkit'
import {loginAPI} from '../api'
import {all, call, fork, put, take, takeLatest} from 'redux-saga/effects'


export const initialState = {    
    loginRequest:false,
    loginSuccess:false,
    loginError:null,
    logoutRequest:false,
    logoutSuccess:false,
    logoutError:null,
    signUpRequest:false,
    signUpSuccess:false,
    signUpError:null,
    isLoggedIn : false,
    user:null
};

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFailure = createAction("LOGIN_FAILURE");

export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutSuccess = createAction("LOGOUT_SUCCESS")
export const logoutFailure = createAction("LOGOUT_FAILURE")

export const signUpRequest = createAction(SIGN_UP_REQUEST)
export const signUpSuccess = createAction("SIGN_UP_SUCCESS")
export const signUpFailure = createAction("SIGN_UP_FAILURE")

const user = createReducer(initialState,{    
    [loginRequest]:(state,action)=>{        
        state.loginRequest=true;
        state.loginSuccess=false;
        state.loginError=null;
    },
    [loginSuccess]:(state,action)=>{
        state.isLoggedIn = true;
        state.user = action.data;
        
        state.loginRequest=false;
        state.loginSuccess=true;
        
    },
    [loginFailure]:(state,action)=>{
        state.loginRequest=false;        
        state.loginError=action.error;
    },
    [logoutRequest]:(state)=>{
        state.logoutRequest=true;
        state.logoutSuccess=false;
        state.logoutError=null;
    },
    [logoutSuccess]:(state,action)=>{
        state.isLoggedIn = false;
        state.user = null; 
        
        state.logoutRequest=false;
        state.logoutSuccess=true;
    },
    [logoutFailure]:(state,action)=>{
        state.looutnRequest=false;        
        state.logoutError=action.error;
    },
    [signUpRequest]:(state,action)=>{        
        state.signUpRequest=true;
        state.signUpSuccess=false;
        state.signUpError=null;
    },
    [signUpSuccess]:(state,action)=>{               
        state.signUpRequest=false;
        state.signUpSuccess=true;
    },
    [signUpFailure]:(state,action)=>{
        state.signUpRequest=false;        
        state.signUpError=action.error;
    },
})


//saga
function* watchLogin(){    
    yield takeLatest(LOGIN_REQUEST, login)
}

function* login({payload}){
    
    try{        
        const result = yield call(loginAPI.login, payload); //동기
        yield put(loginSuccess(result.data))
    }catch(err){
        console.error(err)
        yield put(loginFailure(err.response.data))
    }
}

function* watchLogout(){    
    yield takeLatest(LOGOUT_REQUEST, logout)
}

function* logout({payload}){      
    try{
        //const result = yield call(loginAPI.login, action.data); //동기
        
        yield put(logoutSuccess())
    }catch(err){
        console.error(err)
        yield put(logoutFailure(err.response.data))
    }
}

function* watchSignUp(){    
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* signUp({payload}){      
    try{        
        const result = yield call(loginAPI.signup, payload); //동기
        
        //yield put(signUpSuccess())
    }catch(err){
        console.error(err)
        //yield put(signUpFailure(err.response.data))
    }
}

export function* loginSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp)
    ])
}



export default user;