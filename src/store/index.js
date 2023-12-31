import { configureStore } from "@reduxjs/toolkit";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { AuthorReducer } from "./reducers/authorReducer";
import { ProjectReducer } from "./reducers/projectReducer";

const rootReducer = combineReducers({
  Authors: AuthorReducer,
  Projects: ProjectReducer
});

const store = configureStore({ reducer: rootReducer });
export default store;