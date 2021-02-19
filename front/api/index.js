import axios from 'axios';

//axios.defaults.baseURL
//axios.defaults.withCredentials = true;
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; 
axios.defaults.baseURL = 'http://localhost:3065';

const openApi = axios.create();
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`

export const loginAPI = {
    login : function(data){
        return data
        //return axios.post('/api/login')
    },
    signup : function(data){                        
        return axios.post('/user/signup',data)
    },
    checkIdMultiple : function(data){        
        return axios.post('/user/checkIdMultiple',data)
    }
}

export const bookAPI = {
    getBookList : function(keyword){
        
        return openApi.get('https://dapi.kakao.com/v3/search/book',{
            params: {
                query: keyword,
                page:1
                
            },
            headers: {                
                Authorization: token
            }}
        )
    }
}