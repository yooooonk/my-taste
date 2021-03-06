import axios from 'axios';
import { firestore, storage, realtime, auth } from '../shared/firebase';
import firebase from 'firebase/app';

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
  },
  getRandomPost: function () {
    return postDB.orderBy('insert_dt', 'desc').limit(5).get();
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
    return basketDB.doc(basketId).delete();
  },
  getBookBasket: function (userId, start = null, size = 10) {
    let query = basketDB
      .where('userId', '==', userId)
      .orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start);
    }

    return query.limit(size + 1).get();
  },
  getBookBasketAll: function (userId) {
    return basketDB.where('userId', '==', userId).get();
  },
  updateBookBasket: function (basketId, data) {
    return basketDB.doc(basketId).update(data);
  }
};

export const userAPI = {
  setLoginPersistence: function (displayName, photoURL) {
    return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  login: function (id, pw) {
    return auth.signInWithEmailAndPassword(id, pw);
  },
  logout: function () {
    return auth.signOut();
  },
  createUser: function (id, pw) {
    return auth.createUserWithEmailAndPassword(id, pw);
  },
  updateProfile: function (displayName, photoURL) {
    return auth.currentUser.updateProfile({
      displayName,
      photoURL
    });
  }
};
