import * as actionTypes from '../../actionTypes';
import { hasGotUserSummary } from '../../reducers/user';
import { a } from '../../axiosClient';
import Router from 'next/router';
import { fetchUserSummary } from './fetchUserSummary';

const loginUserRequest = () => ({
    type: actionTypes.LOGIN_USER_REQUEST
});

const loginUserSuccess = () => ({
    type: actionTypes.LOGIN_USER_SUCCESS
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
        const response = await a.request(`api/session`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                request_token
            }
        });
        dispatch(loginUserSuccess());
        dispatch(fetchUserSummary());
        Router.push({ pathname: '/' });
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
};
