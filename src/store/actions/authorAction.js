import {
    ERROR_CLEAR,
    SUCCESS_MESSAGE_CLEAR,
    AUTHOR_LOGIN_ERROR,
    AUTHOR_LOGIN_SUCCESS,
    AUTHOR_LOGOUT_FAIL,
    AUTHOR_LOGOUT_FAIL_CLEAR,
    AUTHOR_LOGOUT_SUCESS,
    AUTHOR_LOGOUT_SUCESS_CLEAR,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL
} from "../types/authorTypes";
import axios from "axios";

import { SERVER_URI } from '../../config/dev';

export const userAuth = (token) => {
    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;

            /* config.headers = {
                ...config.headers,
                'Content-Type': 'application/json'
            }; */

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export const LoginAuthor = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(`${SERVER_URI}/author/login`, data)
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    if (response.data.status) {
                        localStorage.setItem('authToken', response.data.token);

                        dispatch({
                            type: AUTHOR_LOGIN_SUCCESS,
                            payload: {
                                successMessage: response.data.message,
                                token: response.data.token
                            }
                        })
                    } else {
                        // console.log(1)
                        dispatch({
                            type: AUTHOR_LOGIN_ERROR,
                            payload: {
                                error: response.data.message
                            }
                        })
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    // console.log(2)
                    dispatch({
                        type: AUTHOR_LOGIN_ERROR,
                        payload: {
                            error: error
                        }
                    })
                });
        } catch (error) {
            let data = error?.response?.data?.message

            dispatch({
                type: AUTHOR_LOGIN_ERROR,
                payload: {
                    error: data
                }
            })
        }
    }
}

export const LogoutAuthor = () => {

    return async (dispatch) => {

        try {

            let loginId = localStorage.getItem("loginId")
            // console.log(loginId);
            let response = await axios.post(`${SERVER_URI}/admin/logoutUser`, { loginId });

            dispatch({
                type: AUTHOR_LOGOUT_SUCESS,
                payload: {
                    successMessage: response.data.message,
                },
            });

        } catch (error) {
            let data = error.response.data.message;

            dispatch({
                type: AUTHOR_LOGOUT_FAIL,
                payload: {
                    errorMessage: data,
                },
            });

        }

    }

}

export const UpdateAuthor = (data) => {
    return async (dispatch) => {
        let config = {
            headers: {
                adminid: data.adminId,
            },
        };
        let token = localStorage.getItem('authToken')
        try {
            userAuth(token);

            const response = await axios.put(`${SERVER_URI}/admin/updateCurUserData`, data);

            dispatch({
                type: AUTHOR_UPDATE_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })

        } catch (error) {
            let data = error.response.data.message;
            // console.log(data);
            dispatch({
                type: AUTHOR_UPDATE_FAIL,
                payload: {
                    error: data,
                },
            });
        }
    }
}

export const ResetPassword = (data) => {
    return async (dispatch) => {
        let token = localStorage.getItem('authToken')
        try {
            userAuth(token);

            const response = await axios.post(`${SERVER_URI}/admin/reset-password`, data);

            dispatch({
                type: AUTHOR_UPDATE_SUCCESS,
                payload: {
                    successMessage: response.data.message
                },
            });

        } catch (error) {
            let data = error?.response?.data?.message;
            // console.log(data)
            dispatch({
                type: AUTHOR_UPDATE_FAIL,
                payload: {
                    errorMessage: data,
                },
            });
        }
    };
};