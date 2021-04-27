import { createReducer, createAction } from '@reduxjs/toolkit';
import { bookAPI } from '../../api';

import { firestore, storage, realtime } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';
//import 'moment';
//import moment from 'moment';

// initialState
const initialState = {
  searchList: [],
  isEnd: false,
  page: 0,
  keyword: null,
  loading: false,
  detailBook: null,
  bookBasket: [],
  bookDiary: [],
  phraseInputList: [],
  selectedCard: null
};
// actions
const setLoading = createAction('book/SET_LOADING');
const setSearchList = createAction('book/SET_SEARCH_LIST');
const setDetailBook = createAction('book/SET_DETAIL_BOOK');
const setBookBasket = createAction('book/SET_BOOK_BASKET');
const deleteBookBasket = createAction('book/DELETE_BOOK_BASKET');
const clearBookState = createAction('book/CLEAR_BOOK_STATE');

// reducer
const bookReducer = createReducer(initialState, {
  [setSearchList]: (state, { payload }) => {
    if (payload.page === 1) {
      state.searchList = payload.result.documents;
    } else {
      state.searchList = [...state.searchList, ...payload.result.documents];
    }
    state.keyword = payload.keyword;
    state.page = payload.page;
    state.isEnd = payload.result.meta.is_end;
    state.loading = false;
  },
  [setLoading]: (state, { payload }) => {
    state.loading = payload;
  },
  [setDetailBook]: (state, { payload }) => {
    state.detailBook = payload;
  },
  [setBookBasket]: (state, { payload }) => {
    state.bookBasket = [...state.bookBasket, ...payload];
    //list 중복제거
    state.bookBasket = state.bookBasket.reduce((acc, cur) => {
      let idx = acc.findIndex((acc) => acc.id === cur.id);
      if (idx === -1) {
        return [...acc, cur];
      } else {
        acc[idx] = cur;
        return acc;
      }
    }, []);
  },
  [deleteBookBasket]: (state, { payload }) => {
    state.bookBasket = state.bookBasket.filter((b) => b.id !== payload);
  },
  [clearBookState]: (state, { payload }) => {
    state.detailBook = null;
    state.searchList = [];
    state.isEnd = false;
    state.page = 0;
    state.keyword = null;
  }
});

// thunk
const fetchBookList = (data) => async (dispatch, getState, { history }) => {
  try {
    dispatch(setLoading(true));
    const res = await bookAPI.getBookList(data);
    dispatch(
      setSearchList({
        result: res.data,
        page: data.page,
        keyword: data.keyword
      })
    );
  } catch (error) {
    console.error(error);
  }
};

const fetchBookBasket = (data) => async (dispatch, getState, { history }) => {
  try {
    const userId = getState().user.user.uid;

    const docs = await bookAPI.getBookBasket(userId);
    const basket = [];
    docs.forEach((doc) => {
      let book = doc.data();

      basket.push({ ...book, id: doc.id });
    });

    dispatch(setBookBasket(basket));
  } catch (error) {
    console.error(error);
  }
};
const likeBook = (data) => async (dispatch, getState, { history }) => {
  try {
    const userId = getState().user.user.uid;

    const res = await bookAPI.createBookBasket({
      ...data,
      userId,
      isRead: false,
      isWrite: false
    });

    dispatch(setBookBasket([{ ...data, id: res.id }]));
  } catch (error) {
    console.error(error);
  }
};

const dislikeBook = (basketId) => async (dispatch, getState, { history }) => {
  try {
    const res = await bookAPI.deleteBookBasket(basketId);
    dispatch(deleteBookBasket(basketId));
  } catch (error) {
    console.error(error);
  }
};

/* 
const deletePostFB = (postId) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');

    postDB
      .doc(postId)
      .delete()
      .then(() => {
        dispatch(deletePost(postId));
        history.replace('/');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection('post');

    let query = postDB.orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start);
    }
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        // 새로운 페이징정보
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size
        };

        docs.forEach((doc) => {
          let _post = doc.data();

          // ['commenct_cnt', 'contents', ..]
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf('user_') !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] }
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);
        });
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] }
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        dispatch(setPost([post]), {});
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log('게시물 정보가 없어요!');
      return;
    }

    const _image = getState().image.preview;
    console.log(_image, '이미지');
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection('post');
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace('/');
        });

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, 'data_url');

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace('/');
              });
          })
          .catch((err) => {
            window.alert('앗! 이미지 업로드에 문제가 있어요!');
            console.log('앗! 이미지 업로드에 문제가 있어요!', err);
          });
      });
    }
  };
};

const likePostFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) return;
    const _post = getState().post.list.find((p) => p.id === post_id);
    const myId = getState().user.user.uid;
    const myName = getState().user.user.user_name;
    const likers = [..._post.likers, myId];
    const postDB = firestore.collection('post');
    postDB
      .doc(post_id)
      .update({
        likers: likers
      })
      .then((doc) => {
        dispatch(editPost(post_id, { ..._post, likers: likers }));

        const _noti_item = realtime
          .ref(`noti/${_post.user_info.user_id}/list`) // 알림을 저장할 데이터베이스
          .push(); // 공간을 일단 할당

        _noti_item.set(
          {
            post_id: _post.id,
            user_name: myName,
            image_url: _post.image_url,
            insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
            type: 'like'
          },
          (err) => {
            if (err) {
              console.log('알림저장 실패', err);
            } else {
              const notiDB = realtime.ref(`noti/${_post.user_info.user_id}`);
              notiDB.update({ read: false });
            }
          }
        );
      });
  };
};

const unlikePostFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) return;
    const _post = getState().post.list.find((p) => p.id === post_id);
    const myId = getState().user.user.uid;

    const likers = _post.likers.filter((i) => i !== myId);

    const postDB = firestore.collection('post');
    postDB
      .doc(post_id)
      .update({
        likers: likers
      })
      .then((doc) => {
        dispatch(editPost(post_id, { ..._post, likers: likers }));
      });
  };
}; */

// action creator export
export const bookActions = {
  fetchBookList,
  setDetailBook,
  setSearchList,
  likeBook,
  dislikeBook,
  clearBookState,
  fetchBookBasket
};

export default bookReducer;
