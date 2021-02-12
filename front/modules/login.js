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
    isLoggedIn : false,
    user:null
};

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFailure = createAction("LOGIN_FAILURE");

export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutSuccess = createAction("LOGOUT_SUCCESS")
export const logoutFailure = createAction("LOGOUT_FAILURE")

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
    [loginSuccess]:(state,action)=>{
        state.isLoggedIn = true;
        state.user = action.data  
        
        state.logoutRequest=false;
        state.logoutSuccess=true;
    },
    [loginFailure]:(state,action)=>{
        state.looutnRequest=false;        
        state.logoutError=action.error;
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
    yield take(LOGOUT_REQUEST, logout)
}

function* logout({payload}){      
    try{
        //const result = yield call(loginAPI.login, action.data); //동기
        yield put(logoutSuccess(result.data))
    }catch(err){
        console.error(err)
        yield put(logoutFailure(err.response.data))
    }
}


export function* loginSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout)
    ])
}



export default user;