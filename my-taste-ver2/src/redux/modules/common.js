import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const initialState = {
  isMobile: false,
  layout: 'top-bottom'
};

const SET_VIEW_MODE = 'SET_VIEW_MODE';
const SET_LAYOUT = 'SET_LAYOUT';

const setIsMobile = createAction(SET_VIEW_MODE, (isMobile) => ({ isMobile }));
const setLayout = createAction(SET_LAYOUT, (layout) => ({ layout }));

export default handleActions(
  {
    [SET_VIEW_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.isMobile = action.payload.isMobile;
      }),
    [SET_LAYOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.layout = action.payload.layout;
      })
  },
  initialState
);
// action creator export
const actionCreators = {
  setIsMobile,
  setLayout
};

export { actionCreators };
