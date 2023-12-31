import {
    PROJECT_GET_ERROR,
    PROJECT_GET_ERROR_CLEAR,
    PROJECT_GET_SUCCESS,
    PROJECT_GET_SUCESS_CLEAR
} from "../types/projectTypes";

import axios from "axios";

import { SERVER_URI } from '../../config/dev';

let token = localStorage.getItem("authToken")

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

export const getProjectsById = (data) => {
    userAuth(token);

    return async (dispatch) => {
        await axios.post(`${SERVER_URI}/project/get/id`, data)
            .then((response) => {
                // console.log(response.data);
                if (response.data.status) {
                    dispatch({
                        type: PROJECT_GET_SUCCESS,
                        payload: {
                            message: response.data.message,
                            data: response.data.projects
                        }
                    })
                } else {
                    dispatch({
                        type: PROJECT_GET_ERROR,
                        payload: {
                            error: response.data.message
                        }
                    })
                }
            })
            .catch((error) => {
                // console.log(error);
                dispatch({
                    type: PROJECT_GET_ERROR,
                    payload: {
                        error: error
                    }
                })
            });
    }
}

export const getProjectsByMemberId = (data) => {
    userAuth(token);
    // console.log(data)
    return async (dispatch) => {
        await axios.post(`${SERVER_URI}/project/get/memberid`, data)
            .then((response) => {
                // console.log(response.data);
                if (response.data.status) {
                    dispatch({
                        type: PROJECT_GET_SUCCESS,
                        payload: {
                            message: response.data.message,
                            data: response.data.projects
                        }
                    })
                } else {
                    dispatch({
                        type: PROJECT_GET_ERROR,
                        payload: {
                            error: response.data.message
                        }
                    })
                }
            })
            .catch((error) => {
                // console.log(error);
                dispatch({
                    type: PROJECT_GET_ERROR,
                    payload: {
                        error: error
                    }
                })
            });

    }
}