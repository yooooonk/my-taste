import axios from 'axios';

//axios.defaults.baseURL
//axios.defaults.withCredentials = true;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const loginAPI = {
    login : function(data){
        return data
        //return axios.post('/api/login')
    }
}

export const bookAPI = {
    getBookList : function(keyword){
        return axios.get(`https://openapi.naver.com/v1/search/book.json?query=${keyword}`)
    }
}