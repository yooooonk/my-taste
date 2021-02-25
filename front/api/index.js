import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3065';

const openApi = axios.create();
openApi.defaults.withCredentials=false;
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`

export const loginAPI = {
    loadMyInfo : function(){
        return axios.get('/user/')
    },
    login : function(data){        
        return axios.post('/user/login',data)
    },
    logout: function(){        
        return axios.post('/user/logout')
    },
    signup : function(data){                        
        return axios.post('/user/signup',data)
    },
    checkIdMultiple : function(data){        
        return axios.post('/user/checkIdMultiple',data)
    }
}

export const bookAPI = {
    getBookList : function(data){  
        
        return openApi.get('https://dapi.kakao.com/v3/search/book',{
            params: {
                query: data.keyword,
                page:data.page
                
            },
            headers: {                
                Authorization: token
            }}
        )
    },
    
    likeBook : function(data){
        return axios.post('/book/like',data)
    },
    unlikeBook:function(data){
        
        return axios.delete(`/book/unlike/${data}`)
    },
    getBookBasket:function(){
        return axios.get('/book/basket')
    }
}