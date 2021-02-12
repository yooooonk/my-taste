import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
    user:{
        isLoggedIn : false,
        user:null
        
    },
    book:{
        searchBookList:[]
    }
    

};



export const loginAction = (data)=>{
    return {
        type:'LOGIN',
        data
    }
}

export const logoutAction = (data)=>{
    return {
        type:'LOGOUT',
        data
    }
}


const rootReducer = (state = initialState, action)=>{
    switch(action.type){
         case HYDRATE:
            console.log(action);
            return {...state, ...action.payload};  
        case 'LOGIN' :
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn:true,
                    user:action.data
                }
            }
        case 'LOGOUT' :
            
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn:false,
                    user:null
                }
            }
        default:
            return state;
    }
};

export default rootReducer;