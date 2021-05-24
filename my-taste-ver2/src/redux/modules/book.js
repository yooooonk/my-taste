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
const deleteBookBasketCard = createAction('book/DELETE_BOOK_BASKET_CARD');
const updateIsReadStatus = createAction('book/UPDATE_IS_READ_STATUS');
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
  [deleteBookBasketCard]: (state, { payload }) => {
    state.bookBasket = state.bookBasket.filter((b) => b.id !== payload);
  },
  [updateIsReadStatus]: (state, { payload }) => {
    const idx = state.bookBasket.findIndex((b) => b.id === payload.basketId);

    state.bookBasket[idx] = {
      ...state.bookBasket[idx],
      isRead: payload.status
    };
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
const fetchBookList =
  (data) =>
  async (dispatch, getState, { history }) => {
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

const fetchBookBasket =
  (data) =>
  async (dispatch, getState, { history }) => {
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
const fetchCreateBookBasket =
  (data) =>
  async (dispatch, getState, { history }) => {
    try {
      const userId = getState().user.user.uid;

      const res = await bookAPI.createBookBasket({
        ...data,
        userId,
        readDate: null,
        postId: null
      });

      dispatch(setBookBasket([{ ...data, id: res.id }]));
    } catch (error) {
      console.error(error);
    }
  };

const fetchDeleteBookBasket =
  (basketId) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await bookAPI.deleteBookBasket(basketId);
      dispatch(deleteBookBasketCard(basketId));
    } catch (error) {
      console.error(error);
    }
  };

const fetchUpdateIsRead =
  (basketId, status) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await bookAPI.updateBookBasket(basketId, { isRead: status });
      dispatch(updateIsReadStatus({ basketId, status }));
    } catch (error) {
      console.error(error);
    }
  };

const fetchUpdateIsWrite =
  (basketId, postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const data = { postId };
      const res = await bookAPI.updateBookBasket(basketId, data);
      // dispatch(updateIsReadStatus({ basketId, status }));
    } catch (error) {
      console.error(error);
    }
  };

// action creator export
export const bookActions = {
  fetchBookList,
  setDetailBook,
  setSearchList,
  fetchBookBasket,
  fetchCreateBookBasket,
  fetchDeleteBookBasket,
  fetchUpdateIsRead,
  fetchUpdateIsWrite,
  clearBookState
};

export default bookReducer;
