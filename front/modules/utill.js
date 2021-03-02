import {createReducer, createAction} from '@reduxjs/toolkit'
import {utillAPI} from '../api'
import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

export const initialState = {    
    uploadImageRequest:false,
    uploadImageSuccess:false,
    uploadImageError:null,
    imagePath:null
}

const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';

export const uploadImageRequest = createAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccess = createAction('UPLOAD_IMAGE_SUCCESS');
export const uploadImageFailure = createAction('UPLOAD_IMAGE_FAILURE');

export const removeImage = createAction('REMOVE_IMAGE');


const utill = createReducer(initialState,{
    [uploadImageRequest]:(state,{payload})=>{
        state.uploadImageRequest=true;
        state.uploadImageSuccess=false;
        state.uploadImageError=null;
    },
    [uploadImageSuccess]:(state,{payload})=>{
        state.uploadImageRequest=false;
        state.uploadImageSuccess=true;        
        state.imagePath = payload[0];
    },
    [uploadImageFailure]:(state,{payload})=>{
        state.uploadImageRequest=false;
        state.uploadImageError=action.error;
    },
    [removeImage] : (state,{payload})=>{
        state.imagePath = null;
    }

})

function* watchUploadImage(){
    yield takeLatest(UPLOAD_IMAGE_REQUEST,uploadImage)
}

function* uploadImage({payload}){
    try {
        
        const result = yield call(utillAPI.uploadImage,payload);

        yield put(uploadImageSuccess(result.data));
    } catch (error) {
         console.error(error);
        yield put(uploadImageFailure(error.response.data)); 
    }
}

export function* utillSaga(){
    yield all([
        fork(watchUploadImage)
    ])
}

export default utill;