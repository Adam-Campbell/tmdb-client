import * as actionTypes from '../actionTypes';
import { getSessionType, getUserSessionId } from '../reducers/sessionReducer';
import { hasGotUserSummary } from '../reducers/userSummaryReducer';
import { fetchUserSummary } from '../Api';
import axios from 'axios';

const storeUserSummary = (userSummary) => ({
    type: actionTypes.STORE_USER_SUMMARY,
    payload: {
        userSummary
    }
});

export const getUserSummary = () => async (dispatch, getState) => {
    const state = getState();
    if (getSessionType(state) === 'USER' && !hasGotUserSummary(state)) {
        try {
            const userSessionId = getUserSessionId(state);
            const userSummary = await fetchUserSummary(userSessionId);
            dispatch(storeUserSummary(userSummary));
        } catch (err) {
            console.log(err);
        }
    }
}

const loginUserRequest = () => ({
    type: actionTypes.LOGIN_USER_REQUEST
});

const loginUserSuccess = (userSessionId) => ({
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: {
        userSessionId
    }
});

const loginUserFailed = (error) => ({
    type: actionTypes.LOGIN_USER_FAILED,
    payload: {
        error
    }
});

export const loginUser = (request_token) => async (dispatch, getState) => {
    const state = getState();
    if (!request_token || hasGotUserSummary(state)) return;
    try {
        const response = await axios.request(`http://localhost:3000/api/usersession`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                request_token
            }
        });
        const userSessionId = response.data.session_id.session_id;
        dispatch(loginUserSuccess(userSessionId));
        dispatch(getUserSummary());
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
} 


export const logoutUser = () => async (dispatch, getState) => {
    try {
        const response = await axios.delete('http://localhost:3000/api/usersession');
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    } catch (err) {
        console.log(err);
    }
}