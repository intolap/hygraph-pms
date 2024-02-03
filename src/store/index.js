import { configureStore } from "@reduxjs/toolkit";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { AuthorReducer } from "./reducers/authorReducer";
import { ProjectReducer } from "./reducers/projectReducer";
import { TaskReducer } from "./reducers/taskReducer";

const rootReducer = combineReducers({
  Authors: AuthorReducer,
  Projects: ProjectReducer,
  Tasks: TaskReducer
});

const store = configureStore({ reducer: rootReducer });
export default store;