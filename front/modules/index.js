import {createWrapper} from 'next-redux-wrapper';
import {createStore, compose, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {createReducer} from '@reduxjs/toolkit'
import {combineReducers} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { all, fork } from 'redux-saga/effects';
import user, { loginSaga } from './login'
import book, { bookSaga } from './book'
import utill, { utillSaga } from './utill';

//reducer
const index = createReducer({},{
    [HYDRATE]:(state,action)=>{
        state,
        action.payload
    }
})

const rootReducer = combineReducers({
    index,
    user,
    book,
    utill
})

// saga
function* rootSaga(){
    yield all([
        fork(loginSaga),       
        fork(bookSaga),    
        fork(utillSaga)   
    ])
}

const configureStore = ()=>{
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(
        applyMiddleware(...middlewares),
    );

    const store = createStore(rootReducer, enhancer)
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store

};

const wrapper = createWrapper(configureStore,{
    debug:process.env.NODE_ENV === 'development'
});






export default wrapper; 