import {
  PROJECT_GET_ERROR,
  PROJECT_GET_ERROR_CLEAR,
  PROJECT_GET_SUCCESS,
  PROJECT_GET_SUCCESS_CLEAR
} from "../types/projectTypes";
import { jwtDecode } from 'jwt-decode'

const initialState = {
  projectErrorMessage: null,
  projectSuccessMessage: null,
  projectList: [],
};

export const ProjectReducer = (state = initialState, action) => {
  const { payload, type } = action;

  if (type === PROJECT_GET_SUCCESS) {
    // console.log(payload)
    return {
      ...state,
      projectSuccessMessage: payload.message,
      projectList: payload.data
    };
  }

  if (type === PROJECT_GET_ERROR) {
    return {
      ...state,
      projectErrorMessage: payload.errorMessage,
    };
  }

  if (type === PROJECT_GET_SUCCESS_CLEAR) {
    return {
      ...state,
      projectSuccessMessage: null,
    };
  }

  if (type === PROJECT_GET_ERROR_CLEAR) {
    return {
      ...state,
      projectErrorMessage: null,
    };
  }

  return state;
}