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
  },
  updatePost: function (postId, data) {
    return postDB.doc(postId).update(data);
  },
  deletePost: function (postId) {
    return postDB.doc(postId).delete();
  },
  getPosts: function (start = null, size = 3) {
    let query = postDB.orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start);
    }

    return query.limit(size + 1).get();
  },
  getPost: function (postId) {
    return postDB.doc(postId).get();
  }
};

export const notiAPI = {
  pushNoti: function (notiDb) {
    return realtime
      .ref(notiDb) // 알림을 저장할 데이터베이스
      .push(); // 공간을 일단 할당
  },
  updateNoti: function (notiId, data) {
    return realtime.ref(notiId).update(data);
  }
};

export const imageAPI = {
  uploadImage: function (fileName, image) {
    return storage.ref(fileName).putString(image, 'data_url');
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
    return basketDB.where('userId', '==', userId).get();
  },
  updateBookBasket: function (basketId, data) {
    return basketDB.doc(basketId).update(data);
  }
};
