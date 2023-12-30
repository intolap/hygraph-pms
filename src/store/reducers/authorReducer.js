import {
  AUTHOR_LOGIN_ERROR,
  AUTHOR_LOGIN_SUCCESS,
  AUTHOR_LOGOUT_FAIL,
  AUTHOR_LOGOUT_FAIL_CLEAR,
  AUTHOR_LOGOUT_SUCESS,
  AUTHOR_LOGOUT_SUCESS_CLEAR,
  AUTHOR_UPDATE_FAIL,
  AUTHOR_UPDATE_SUCCESS,
  ERROR_CLEAR,
  SUCCESS_MESSAGE_CLEAR
} from "../types/authorTypes";
import { jwtDecode } from 'jwt-decode'

const initialState = {
  loading: true,
  error: "",
  successMessage: "",
  authenticate: false,
  token: "",
  myInfo: {},
  logoutSuccess: null,
  logoutError: null,
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) {
    return null
  }
  return tokenDecoded;
}

const getToken = localStorage.getItem('authToken');
if (getToken && getToken.length > 0) {
  const getInfo = jwtDecode(getToken);

  if (getInfo) {
    initialState.myInfo = getInfo;
    initialState.token = getToken;
    initialState.authenticate = true;
    initialState.loading = false
  }
}

export const AuthorReducer = (state = initialState, action) => {
  const { payload, type } = action;

  if (type === AUTHOR_LOGIN_SUCCESS) {
    const myInfo = jwtDecode(payload.token);

    return {
      ...state,
      successMessage: payload.successMessage,
      token: payload.token,
      myInfo: myInfo,
      authenticate: true,
      // loading: false,
    }
  }

  if (type === AUTHOR_LOGIN_ERROR) {
    return {
      ...state,
      error: payload.error
    }
  }

  if (type === AUTHOR_UPDATE_SUCCESS) {
    return {
      ...state,
      successMessage: payload.successMessage,
    }
  }
  if (type === AUTHOR_UPDATE_FAIL) {
    return {
      ...state,
      error: payload.errorMessage,
    };
  }
  if (type === SUCCESS_MESSAGE_CLEAR) {
    return {
      ...state,
      successMessage: ''
    }
  }
  if (type === ERROR_CLEAR) {
    return {
      ...state,
      error: ''
    }
  }

  if (type === AUTHOR_LOGOUT_SUCESS) {
    return {
      ...state,
      logoutSuccess: payload.successMessage,
    }
  }
  if (type === AUTHOR_LOGOUT_FAIL) {
    return {
      ...state,
      logoutError: payload.errorMessage
    }
  }

  if (type === AUTHOR_LOGOUT_SUCESS_CLEAR) {
    return {
      ...state,
      logoutSuccess: null
    }
  }
  if (type === AUTHOR_LOGOUT_FAIL_CLEAR) {
    return {
      ...state,
      logoutError: null
    }
  }

  return state;
}