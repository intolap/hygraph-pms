import {
    TASK_GET_ERROR,
    TASK_GET_ERROR_CLEAR,
    TASK_GET_SUCCESS,
    TASK_GET_SUCCESS_CLEAR
} from "../types/taskTypes";
import { jwtDecode } from 'jwt-decode'

const initialState = {
    taskErrorMessage: null,
    taskSuccessMessage: null,
    taskList: [],
};

export const TaskReducer = (state = initialState, action) => {
    const { payload, type } = action;

    if (type === TASK_GET_SUCCESS) {
        // console.log(payload)
        return {
            ...state,
            taskSuccessMessage: payload.message,
            taskList: payload.data
        };
    }

    if (type === TASK_GET_ERROR) {
        return {
            ...state,
            taskErrorMessage: payload.errorMessage,
        };
    }

    if (type === TASK_GET_SUCCESS_CLEAR) {
        return {
            ...state,
            taskSuccessMessage: null,
        };
    }

    if (type === TASK_GET_ERROR_CLEAR) {
        return {
            ...state,
            taskErrorMessage: null,
        };
    }

    return state;
}