import axios from 'axios';

const openApi = axios.create();
openApi.defaults.withCredentials = false;
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`;

export const bookAPI = {
  getBookList: function (data) {
    return openApi.get('https://dapi.kakao.com/v3/search/book', {
      params: {
        query: data.keyword,
        page: data.page
      },
      headers: {
        Authorization: token
      }
    });
  }
};
