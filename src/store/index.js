import { configureStore } from "@reduxjs/toolkit";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { AuthorReducer } from "./reducers/authorReducer";

const rootReducer = combineReducers({
  Authors: AuthorReducer
});

const store = configureStore({ reducer: rootReducer });
export default store;