import { createReducer, createAction } from '@reduxjs/toolkit';
import { initial } from 'lodash';

const initialState = {
  isMobile: false,
  currentMenu: null
};

const setIsMobile = createAction('common/SET_IS_MOBILE');
const setCurrentMenu = createAction('common/SET_CURRENT_MENU');

const commonReducer = createReducer(initialState, {
  [setIsMobile]: (state, { payload }) => {
    state.isMobile = payload;
  },
  [setCurrentMenu]: (state, { payload }) => {
    state.currentMenu = payload;
  }
});
// action creator export
export const commonActions = {
  setIsMobile,
  setCurrentMenu
};

export default commonReducer;
