import {createReducer} from '@reduxjs/toolkit'
import {combineReducers} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user from './loginReducer'


const index = createReducer({},{
    [HYDRATE]:(state,action)=>{
        state,
        action.payload
    }
})

const rootReducer = combineReducers({
    index,
    user    
})

export default rootReducer;