import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./uiReducer";
import { sessionStateReducer } from "./sessionReducer";
export * from "./uiReducer";
export * from "./sessionReducer";

export const createRootReducer = (routerReducer) => {
  const mainReducer = combineReducers({
    router: routerReducer,
    ui: uiReducer,
  });
  const reducerChain = [mainReducer, sessionStateReducer];
  return (state, action) =>
    reducerChain.reduce(
      (newState, reducer) => reducer(newState, action),
      state,
    );
};
