import * as actionTypes from '../actionTypes';
import { getSessionType, getUserSessionId } from '../reducers/sessionReducer';
import { hasGotUserSummary, getUserId } from '../reducers/userSummaryReducer';
import { fetchUserSummary, postFavourite, postWatchlist } from '../Api';
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


const markFavouriteSuccess = (id, isMarking) => ({
    type: actionTypes.MARK_FAVOURITE_SUCCESS,
    payload: {
        id,
        isMarking
    }
});

const markFavouriteFailed = (error) => ({
    type: actionTypes.MARK_FAVOURITE_FAILED,
    payload: {
        error
    }
});

export const markFavourite = (mediaType, mediaId, isMarking) => async (dispatch, getState) => {
    const state = getState();
    const sessionId = getUserSessionId(state);
    const accountId = getUserId(state);
    if (!sessionId) {
        dispatch(markFavouriteFailed('User is not logged in'));
        return;
    }

    try {
        const response = await postFavourite(mediaType, mediaId, isMarking, accountId, sessionId);
        //console.log(response);
        dispatch(markFavouriteSuccess(mediaId, isMarking));
    } catch (error) {
        dispatch(markFavouriteFailed(error));
    }
}


const editWatchlistSuccess = (id, isAdding) => ({
    type: actionTypes.EDIT_WATCHLIST_SUCCESS,
    payload: {
        id,
        isAdding
    }
});

const editWatchlistFailed = (error) => ({
    type: actionTypes.EDIT_WATCHLIST_FAILED,
    payload: {
        error
    }
});

export const editWatchlist = (mediaType, mediaId, isAdding) => async (dispatch, getState) => {
    console.log('editWatchlist was called!');
    const state = getState();
    const sessionId = getUserSessionId(state);
    const accountId = getUserId(state);
    if (!sessionId) {
        dispatch(editWatchlistFailed('User is not logged in'));
        return;
    }

    try {
        const response = await postWatchlist(mediaType, mediaId, isAdding, accountId, sessionId);
        //console.log(response);
        dispatch(editWatchlistSuccess(mediaId, isAdding));
    } catch (error) {
        dispatch(editWatchlistFailed(error));
    }
}