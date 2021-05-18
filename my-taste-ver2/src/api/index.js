import axios from 'axios';
import { firestore, storage, realtime } from '../shared/firebase';

const openApi = axios.create();
openApi.defaults.withCredentials = false;
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`;

const basketDB = firestore.collection('basket');
const postDB = firestore.collection('post');
export const postAPI = {
  createPost: function (data) {
    return postDB.add(data);
  }
};
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
  },
  createBookBasket: function (data) {
    return basketDB.add(data);
  },
  deleteBookBasket: function (basketId) {
    // const basketDB = firestore.collection('basket');
    return basketDB.doc(basketId).delete();
  },
  getBookBasket: function (userId) {
    // const basketDB = firestore.collection('basket');
    return basketDB.where('userId', '==', userId).get();
  },
  updateBookBasket: function (basketId, data) {
    // const basketDB = firestore.collection('basket');
    return basketDB.doc(basketId).update(data);
  }
};
