import {createReducer, createAction} from '@reduxjs/toolkit'
import {bookAPI} from '../api'
import {all, call, fork, put, take, takeLatest} from 'redux-saga/effects'


export const initialState = {    
    bookSearchRequest:false,
    bookSearchSuccess:false,
    bookSearchError:null,
    bookSearchList:[]
};

const BOOK_SEARCH_REQUEST = 'BOOK_SEARCH_REQUEST';

export const bookSearchRequest = createAction(BOOK_SEARCH_REQUEST);
export const bookSearchSuccess = createAction("BOOK_SEARCH_SUCCESS");
export const bookSearchFailure = createAction("BOOK_SEARCH_FAILURE");


const book = createReducer(initialState,{    
    [bookSearchRequest]:(state,action)=>{        
        state.bookSearchRequest=true;
        state.bookSearchSuccess=false;
        state.bookSearchError=null;
    },
    [bookSearchSuccess]:(state,{payload})=>{
        state.bookSearchList = payload.searchResult;        
        state.bookSearchRequest=false;
        state.bookSearchSuccess=true;
        
    },
    [bookSearchFailure]:(state,action)=>{
        state.bookSearchRequest=false;        
        state.bookSearchError=action.error;
    },
   
})


//saga
function* watchSearchBook(){    
    
    yield takeLatest(BOOK_SEARCH_REQUEST, searchBook)
}

function* searchBook({payload}){
    
    try{        
        const result = yield call(bookAPI.getBookList, payload); //동기
        
        yield put(bookSearchSuccess({searchResult:result.data.documents}));
        
    }catch(err){
        console.error(err)
        yield put(bookSearchFailure(err.response))
        //yield put(bookSearchFailure(err.response.data))
    }
}


export function* bookSaga(){
    yield all([
        fork(watchSearchBook)        
    ])
}



export default book;