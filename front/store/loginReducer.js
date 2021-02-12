import {createReducer, createAction} from '@reduxjs/toolkit'

export const initialState = {    
    isLoggedIn : false,
    user:null
};

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT")

const user = createReducer(initialState,{    
    [login]:(state,action)=>{        
        state.isLoggedIn = true;
        state.user = action.data
        
    },
    [logout]:(state)=>{
        state.isLoggedIn = false;
        state.user = null;
    }
})

export default user;