import { createReducer, createAction } from '@reduxjs/toolkit';
import { bookAPI } from '../../api';
import moment from 'moment';
import { firestore, storage, realtime } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';

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
  selectedCard: null,
  paging: { start: null, next: null, size: 15 },
  dashBoard: []
};
// actions
const setLoading = createAction('book/SET_LOADING');
const setSearchList = createAction('book/SET_SEARCH_LIST');
const setDetailBook = createAction('book/SET_DETAIL_BOOK');
const setBookBasket = createAction('book/SET_BOOK_BASKET');
const deleteBookBasketCard = createAction('book/DELETE_BOOK_BASKET_CARD');
const updateBookBasket = createAction('book/UPDATE_IS_READ_STATUS');
const clearBookState = createAction('book/CLEAR_BOOK_STATE');
const setDashboad = createAction('book/SET_DASHBOARD');

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
  [setDashboad]: (state, { payload }) => {
    state.dashBoard = payload;
    state.loading = false;
  },
  [setBookBasket]: (state, { payload }) => {
    if (payload.paging) {
      state.bookBasket = [...state.bookBasket, ...payload.basket];
    } else {
      state.bookBasket = [...payload.basket, ...state.bookBasket];
    }

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

    if (payload.paging) {
      state.paging = payload.paging;
    }
    state.loading = false;
  },
  [deleteBookBasketCard]: (state, { payload }) => {
    state.bookBasket = state.bookBasket.filter((b) => b.id !== payload);
  },
  [updateBookBasket]: (state, { payload }) => {
    const idx = state.bookBasket.findIndex((b) => b.id === payload.basketId);
    state.bookBasket[idx] = {
      ...state.bookBasket[idx],
      ...payload.status
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
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { start, size, next } = getState().book.paging;

      if (start && !next) {
        return;
      }

      dispatch(setLoading(true));
      const userId = getState().user.user.uid;

      const docs = await bookAPI.getBookBasket(userId, next, size);

      let paging = {
        start: docs.docs[0],
        next:
          docs.docs.length === size + 1
            ? docs.docs[docs.docs.length - 1]
            : null,
        size: size
      };

      const basket = [];
      docs.forEach((doc) => {
        let book = doc.data();

        basket.push({ ...book, id: doc.id });
      });
      basket.pop();
      dispatch(setBookBasket({ basket, paging }));
    } catch (error) {
      console.error(error);
    }
  };

const fetchBookBasketAll =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(setLoading(true));
      const userId = getState().user.user.uid;

      const docs = await bookAPI.getBookBasketAll(userId);

      const dashboard = [];
      docs.forEach((doc) => {
        let basket = doc.data();

        dashboard.push({ ...basket, id: doc.id });
      });

      dispatch(setDashboad(dashboard));
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
        postId: null,
        insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
      });

      dispatch(
        setBookBasket({ basket: [{ ...data, id: res.id }], paging: null })
      );
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

const fetchUpdateBookBasket =
  (basketId, status) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await bookAPI.updateBookBasket(basketId, status);
      dispatch(updateBookBasket({ basketId, status }));
    } catch (error) {
      console.error(error);
    }
  };

const fetchUpdateIsWrite =
  (basketId, postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const status = { postId };
      const res = await bookAPI.updateBookBasket(basketId, status);
      dispatch(updateBookBasket({ basketId, status }));
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
  fetchBookBasketAll,
  fetchCreateBookBasket,
  fetchDeleteBookBasket,
  fetchUpdateBookBasket,
  fetchUpdateIsWrite,
  clearBookState
};

export default bookReducer;
