import React from "react";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";

const rootReduser = combineReducers({});

export const store = createStore(
  rootReduser,
  composeWithDevTools(applyMiddleware(thunk))
);
