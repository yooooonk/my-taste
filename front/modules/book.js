import {createReducer, createAction} from '@reduxjs/toolkit'
import {bookAPI} from '../api'
import {all, call, fork, put, take, takeLatest} from 'redux-saga/effects'


export const initialState = {    
    bookSearchList:[],
    bookBasket:[],
    detailBook:null,
    selectedCard:null,
    bookSearchRequest:false,
    bookSearchSuccess:false,
    bookSearchError:null,    
    is_end:false,
    keyword:null,
    getBookBasketRequest:false,
    getBookBasketSuccess:false,
    getBookBasketError:null,    
    bookLikeRequest:false,
    bookLikeSuccess:false,
    bookLikeError:null,
    bookUnlikeRequest:false,
    bookUnlikeSuccess:false,
    bookUnlikeError:null,    
    updateBookStateRequest:false,
    updateBookStateSuccess:false,
    updateBookStateError:null,
};

const BOOK_SEARCH_REQUEST = 'BOOK_SEARCH_REQUEST';
const BOOK_LIKE_REQUEST = 'BOOK_LIKE_REQUEST';
const BOOK_UNLIKE_REQUEST = 'BOOK_UNLIKE_REQUEST';
const GET_BOOK_BASKET_REQUEST = 'GET_BOOK_BASKET_REQUEST';
const UPDATE_BOOK_STATE_REQUEST = 'UPDATE_BOOK_STATE_REQUEST';

export const bookSearchRequest = createAction(BOOK_SEARCH_REQUEST);
export const bookSearchSuccess = createAction("BOOK_SEARCH_SUCCESS");
export const bookSearchFailure = createAction("BOOK_SEARCH_FAILURE");

export const bookLikeRequest = createAction(BOOK_LIKE_REQUEST);
export const bookLikeSuccess = createAction("BOOK_LIKE_SUCCESS");
export const bookLikeFailure = createAction("BOOK_LIKE_FAILURE");

export const bookUnlikeRequest = createAction(BOOK_UNLIKE_REQUEST);
export const bookUnlikeSuccess = createAction("BOOK_UNLIKE_SUCCESS");
export const bookUnlikeFailure = createAction("BOOK_UNLIKE_FAILURE");

export const getBookBasketRequest = createAction(GET_BOOK_BASKET_REQUEST);
export const getBookBasketSuccess = createAction("GET_BOOK_BASKET_SUCCESS");
export const getBookBasketFailure = createAction("GET_BOOK_BASKET_FAILURE");

export const updateBookStateRequest = createAction(UPDATE_BOOK_STATE_REQUEST);
export const updateBookStateSuccess = createAction("UPDATE_BOOK_STATE_SUCCESS");
export const updateBookStateFailure = createAction("UPDATE_BOOK_STATE_FAILURE");

export const setDetailBook = createAction("SET_DETAIL_BOOK");
export const setSelectedCard = createAction("SET_SELECTED_CARD");

const book = createReducer(initialState,{    
    [bookSearchRequest]:(state,{payload})=>{     
                   
        state.bookSearchRequest=true;
        state.bookSearchSuccess=false;
        state.bookSearchError=null;
        state.is_end=false;
        state.keyword=payload.keyword;
        
    },
    [bookSearchSuccess]:(state,{payload})=>{                
        
        state.bookSearchRequest=false;
        state.bookSearchSuccess=true;        

        if(payload.page===1){
            state.bookSearchList = payload.searchResult;
        }else{
            const xList = state.bookSearchList
            state.bookSearchList = xList.concat(payload.searchResult)
        }
        state.is_end = payload.is_end;
        
    },
    [bookSearchFailure]:(state,action)=>{
        state.bookSearchRequest=false;        
        state.bookSearchError=action.error;
    },
    [bookLikeRequest]:(state,action)=>{        
        state.bookLikeRequest=true;
        state.bookLikeSuccess=false;
        state.bookLikeError=null;
    },
    [bookLikeSuccess]:(state,{payload})=>{
        
        state.bookBasket.push(payload.result);        
        state.bookLikeRequest=false;
        state.bookLikeSuccess=true;        
    },
    [bookLikeFailure]:(state,action)=>{
        state.bookLikeRequest=false;        
        state.bookLikeError=action.error;
    },
    [bookUnlikeRequest]:(state,action)=>{        
        state.bookUnlikeRequest=true;
        state.bookUnlikeSuccess=false;
        state.bookUnlikeError=null;
    },
    [bookUnlikeSuccess]:(state,{payload})=>{
        const isbn = payload;
        const basket = state.bookBasket
        
        state.bookBasket = basket.filter((b)=>b.isbn !== isbn)
        
        state.bookUnlikeRequest=false;
        state.bookUnlikeSuccess=true;        
    },
    [bookUnlikeFailure]:(state,action)=>{
        state.bookUnlikeRequest=false;        
        state.bookUnlikeError=action.error;
    },
    [getBookBasketRequest]:(state,action)=>{        
        state.getBookBasketRequest=true;
        state.getBookBasketSuccess=false;
        state.getBookBasketError=null;
    },
    [getBookBasketSuccess]:(state,{payload})=>{        
        
        state.bookBasket = payload;        
        state.getBookBasketRequest=false;
        state.getBookBasketSuccess=true;        
    },
    [getBookBasketFailure]:(state,action)=>{
        state.getBookBasketRequest=false;        
        state.getBookBasketError=action.error;
    },
    [updateBookStateRequest]:(state,action)=>{        
        state.updateBookStateRequest=true;
        state.updateBookStateSuccess=false;
        state.updateBookStateError=null;
    },
    [updateBookStateSuccess]:(state,{payload})=>{  
        let temp = state.bookBasket;        
        
        temp.slice(temp.findIndex(v=>v._id===payload.id),1,payload.book);
        console.log(payload.book)
        state.bookBasket = temp;
        
        state.updateBookStateRequest=false;
        state.updateBookStateSuccess=true;        
    },
    [updateBookStateFailure]:(state,action)=>{
        state.updateBookStateRequest=false;        
        state.updateBookStateError=action.error;
    },    
    [setDetailBook]:(state,{payload})=>{        
        state.detailBook = payload    
    },
    [setSelectedCard]:(state,{payload})=>{
        state.selectedCard = payload
    },
   
})


//saga
function* watchSearchBook(){    
    
    yield takeLatest(BOOK_SEARCH_REQUEST, searchBook)
}

function* searchBook({payload}){
    
    try{        
        const result = yield call(bookAPI.getBookList, payload); //동기        
        
        yield put(bookSearchSuccess({searchResult:result.data.documents,is_end:result.data.meta.is_end, page:payload.page}));
        
    }catch(err){
        console.error(err)
        yield put(bookSearchFailure(err.response))
        
    }
}

function* watchLikeBook(){        
    yield takeLatest(BOOK_LIKE_REQUEST, likeBook)
}

function* likeBook({payload}){
    
    try{        
        const result = yield call(bookAPI.likeBook, payload); //동기
        
        yield put(bookLikeSuccess({result:result.data}));
        
    }catch(err){
        console.error(err)
        yield put(bookLikeFailure(err.response.data))        
    }
}

function* watchUnlikeBook(){        
    yield takeLatest(BOOK_UNLIKE_REQUEST, unlikeBook)
}

function* unlikeBook({payload}){
    
    try{        
        const result = yield call(bookAPI.unlikeBook, payload); //동기
        
        yield put(bookUnlikeSuccess(result.data));
        
    }catch(err){
        console.error(err)
        yield put(bookUnikeFailure(err.response.data))        
    }
}

function* watchGetBookBasket(){        
    yield takeLatest(GET_BOOK_BASKET_REQUEST, getBookBasket)
}

function* getBookBasket(){
    
    try{        
        const result = yield call(bookAPI.getBookBasket); //동기
        
        yield put(getBookBasketSuccess(result.data));
        
    }catch(err){
        console.error(err)
        yield put(getBookBasketFailure(err.response.data))        
    }
}

function* watchUpdateBookState(){        
    yield takeLatest(UPDATE_BOOK_STATE_REQUEST, updateBookState)
}

function* updateBookState({payload}){
    
    try{        
        const result = yield call(bookAPI.updateBookState,payload); //동기
        
        yield put(updateBookStateSuccess({id:payload.id,state:payload.state,book:result.data}));
        
    }catch(err){
        console.error(err)
        yield put(updateBookStateFailure(err.response.data))        
    }
}

export function* bookSaga(){
    yield all([
        fork(watchSearchBook),       
        fork(watchLikeBook),       
        fork(watchUnlikeBook),       
        fork(watchGetBookBasket),       
        fork(watchUpdateBookState),       
    ])
}



export default book;