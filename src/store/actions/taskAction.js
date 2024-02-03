import {
    TASK_GET_ERROR,
    TASK_GET_ERROR_CLEAR,
    TASK_GET_SUCCESS,
    TASK_GET_SUCESS_CLEAR
} from "../types/taskTypes";

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

export const getTaskById = (data) => {
    userAuth(token);

    return async (dispatch) => {
        await axios.post(`${SERVER_URI}/task/get/id`, data)
            .then((response) => {
                // console.log(response.data);
                if (response.data.status) {
                    dispatch({
                        type: TASK_GET_SUCCESS,
                        payload: {
                            message: response.data.message,
                            data: response.data.tasks
                        }
                    })
                } else {
                    dispatch({
                        type: TASK_GET_ERROR,
                        payload: {
                            error: response.data.message
                        }
                    })
                }
            })
            .catch((error) => {
                // console.log(error);
                dispatch({
                    type: TASK_GET_ERROR,
                    payload: {
                        error: error
                    }
                })
            });
    }
}

export const getTasksByMemberId = (data) => {
    userAuth(token);
    // console.log(data)
    return async (dispatch) => {
        await axios.post(`${SERVER_URI}/task/get/memberid`, data)
            .then((response) => {
                // console.log(response.data);
                if (response.data.status) {
                    dispatch({
                        type: TASK_GET_SUCCESS,
                        payload: {
                            message: response.data.message,
                            data: response.data.tasks
                        }
                    })
                } else {
                    dispatch({
                        type: TASK_GET_ERROR,
                        payload: {
                            error: response.data.message
                        }
                    })
                }
            })
            .catch((error) => {
                // console.log(error);
                dispatch({
                    type: TASK_GET_ERROR,
                    payload: {
                        error: error
                    }
                })
            });

    }
}