import {createReducer, createAction} from '@reduxjs/toolkit'
import {loginAPI} from '../api'
import {all, call, fork, put, take, takeLatest} from 'redux-saga/effects'


export const initialState = {    
    loadMyInfoRequest:false,
    loadMyInfoSuccess:false,
    loadMyInfoError:null, 
    getDashboardDataRequest:false,
    getDashboardDataSuccess:false,
    getDashboardDataError:null,   
    dashboardData:[],
    loginRequest:false,
    loginSuccess:false,
    loginError:null,
    logoutRequest:false,
    logoutSuccess:false,
    logoutError:null,
    signUpRequest:false,
    signUpSuccess:false,
    signUpError:null,  
    checkIdMultipleRequest:false,
    checkIdMultipleSuccess:false,
    checkIdMultipleError:null,     
    isLoggedIn : false,    
    user:null
};

const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const CHECK_ID_MULTIPLE_REQUEST = 'CHECK_ID_MULTIPLE_REQUEST';
const RESET_SIGN_UP_STATE = "RESET_SIGN_UP_STATE"
const GET_DASHBOARD_DATA_REQUEST = "GET_DASHBOARD_DATA_REQUEST"

export const loadMyInfoRequest = createAction(LOAD_MY_INFO_REQUEST);
export const loadMyInfoSuccess = createAction("LOAD_MY_INFO_SUCCESS");
export const loadMyInfoFailure = createAction("LOAD_MY_INFO_FAILURE");

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFailure = createAction("LOGIN_FAILURE");

export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutSuccess = createAction("LOGOUT_SUCCESS")
export const logoutFailure = createAction("LOGOUT_FAILURE")

export const signUpRequest = createAction(SIGN_UP_REQUEST)
export const signUpSuccess = createAction("SIGN_UP_SUCCESS")
export const signUpFailure = createAction("SIGN_UP_FAILURE")

export const checkIdMultipleRequest = createAction(CHECK_ID_MULTIPLE_REQUEST)
export const checkIdMultipleSuccess = createAction("CHECK_ID_MULTIPLE_SUCCESS")
export const checkIdMultipleFailure = createAction("CHECK_ID_MULTIPLE_FAILURE")

export const getDashboardDataRequest = createAction(GET_DASHBOARD_DATA_REQUEST)
export const getDashboardDataSuccess = createAction("GET_DASHBOARD_DATA_SUCCESS")
export const getDashboardDataFailure = createAction("GET_DASHBOARD_DATA_FAILURE")

export const resetSignupState = createAction(RESET_SIGN_UP_STATE)

const user = createReducer(initialState,{   
    [loadMyInfoRequest]:(state,action)=>{        
        state.loadMyInfoRequest=true;
        state.loadMyInfoSuccess=false;
        state.loadMyInfoError=null;
    },
    [loadMyInfoSuccess]:(state,{payload})=>{
        
        if(payload){
            state.isLoggedIn = true;
        }
        state.user = payload;
        state.loadMyInfoRequest=false;
        state.loadMyInfoSuccess=true;
        
    },
    [loadMyInfoFailure]:(state,action)=>{        
        state.loadMyInfoRequest=false;        
        state.loadMyInfoError=action.payload;
    }, 
    [loginRequest]:(state,action)=>{        
        state.loginRequest=true;
        state.loginSuccess=false;
        state.loginError=null;
    },
    [loginSuccess]:(state,action)=>{
        state.isLoggedIn = true;
        state.user = action.payload;
        
        state.loginRequest=false;
        state.loginSuccess=true;
        
    },
    [loginFailure]:(state,action)=>{        
        state.loginRequest=false;        
        state.loginError=action.payload;
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
        state.signUpError=action.payload.errorMsg;
    },
    [checkIdMultipleRequest]:(state,action)=>{                
        state.checkIdMultipleRequest=true;
        state.checkIdMultipleSuccess=false;
        state.checkIdMultipleError=null;
    },
    [checkIdMultipleSuccess]:(state,action)=>{               
        state.checkIdMultipleRequest=false;
        state.checkIdMultipleSuccess=true;
    },
    [checkIdMultipleFailure]:(state,action)=>{        
        state.checkIdMultipleRequest=false;        
        state.checkIdMultipleError=action.payload.errorMsg;
    },
    [resetSignupState]:(state,action)=>{
        state.signUpRequest=false
        state.signUpSuccess=false
        state.signUpError=null
        state.checkIdMultipleRequest=false
        state.checkIdMultipleSuccess=false
        state.checkIdMultipleError=null
    },
    [getDashboardDataRequest]:(state,action)=>{   
        console.log('get Dashboad request')             
        state.getDashboardDataRequest=true;
        state.getDashboardDataSuccess=false;
        state.getDashboardDataError=null;
    },
    [getDashboardDataSuccess]:(state,{payload})=>{               
        state.dashboardData = payload;        
        state.getDashboardDataRequest=false;
        state.getDashboardDataSuccess=true;
    },
    [getDashboardDataFailure]:(state,action)=>{        
        state.getDashboardDataRequest=false;        
        state.getDashboardDataError=action.payload.errorMsg;
    },

})


//saga

function* watchLoadMyInfo(){    
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

function* loadMyInfo({payload}){
    
    try{        
        const result = yield call(loginAPI.loadMyInfo);         
        yield put(loadMyInfoSuccess(result.data))
    }catch(err){
        console.error(err)
        yield put(loadMyInfoFailure(err.response.data))
    }
}

function* watchLogin(){    
    yield takeLatest(LOGIN_REQUEST, login)
}

function* login({payload}){
    
    try{        
        const result = yield call(loginAPI.login, payload); 
        yield put(loginSuccess(result))
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
        const result = yield call(loginAPI.logout); //동기
        
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
        yield put(signUpSuccess())
    }catch(err){   
        console.error(err.response.data)
        yield put(signUpFailure(err.response.data))
    }
}

function* watchCheckIdMultiple(){    
    yield takeLatest(CHECK_ID_MULTIPLE_REQUEST, checkIdMultiple)
}

function* checkIdMultiple({payload}){      
    try{                
        const result = yield call(loginAPI.checkIdMultiple, payload); //동기        
        yield put(checkIdMultipleSuccess(result))
    }catch(err){   
        console.error(err)
        yield put(checkIdMultipleFailure(err.response.data))
    }
}

function* watchGetDashboardData(){    
    yield takeLatest(GET_DASHBOARD_DATA_REQUEST, getDashboardData)
}

function* getDashboardData(){
    
    try{        
        const result = yield call(loginAPI.getDashboardData);
        yield put(getDashboardDataSuccess(result.data))
    }catch(err){
        console.error(err)
        yield put(getDashboardDataFailure(err.response.data))
    }
}


export function* loginSaga(){
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchCheckIdMultiple),
        fork(watchGetDashboardData),
      
    ])
}



export default user;