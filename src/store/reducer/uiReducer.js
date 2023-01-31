import { createAction, createReducer } from '@reduxjs/toolkit';

// Handle exceptions
export const loading = createAction(
  'LOADING'
);

export const defaultAction = createAction(
  'DEFAULT_ACTION'
);

export const defaultDoneAction = createAction(
  'DEFAULT_DONE_ACTION'
);

export const defaultError = createAction(
  'DEFAULT_ERROR'
);


// UI state reducers
const initialState = {
  default: null,
  defaultError: null,
  loading: false,
};

const uiReducer = createReducer(initialState, {
  [defaultDoneAction]: (state, action) => {
    state.default = action.payload;
  },
  [defaultError]: (state, action) => {
    state.defaultError = action.payload;
  },
  [loading]: (state, action) => {
    state.loading = action.payload;
  }
});

export default uiReducer;
