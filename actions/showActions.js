import * as actionTypes from '../actionTypes';
import { getHasSession } from '../reducers/sessionReducer';
import { getShowId, getShowData } from '../reducers/showReducer';
import { a } from '../axiosClient';
import toast from '../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const fetchShowRequest = () => ({
    type: actionTypes.FETCH_SHOW_REQUEST
});

const fetchShowSuccess = (data, id) => ({
    type: actionTypes.FETCH_SHOW_SUCCESS,
    payload: {
        data,
        id
    }
});

const fetchShowFailed = (error) => ({
    type: actionTypes.FETCH_SHOW_FAILED,
    payload: {
        error
    }
});


export const fetchShow = (id, ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    if (id === getShowId(state)) return;

    try {
        const response = await a.get(`api/show/${id}`, {
            headers: ssrHeaders
        });
        const showData = response.data;
        showData.credits.cast = showData.credits.cast.sort((a,b) => a.order - b.order);
        dispatch(fetchShowSuccess(showData, id));
    } catch (error) {
        dispatch(fetchShowFailed(error));
        throw new Error(error.response.status);
    }
}

const rateShowOptimisticRequest = (rating, id, transactionId) => ({
    type: actionTypes.RATE_SHOW_OPTIMISTIC_REQUEST,
    payload: {
        rating,
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const rateShowSuccess = (transactionId) => ({
    type: actionTypes.RATE_SHOW_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const rateShowFailed = (transactionId) => ({
    type: actionTypes.RATE_SHOW_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const rateShow = (rating, showId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(rateShowFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(rateShowOptimisticRequest(rating, showId, transactionId));
        const response = await a.request(`api/show/${showId}/rating`, {
            params: { rating },
            method: 'POST'
        });
        dispatch(rateShowSuccess(transactionId));
        toast.success('TV show successfully rated');
    } catch (error) {
        dispatch(rateShowFailed(transactionId));
        toast.error(error.response.data);
    }
}

const removeShowRatingOptimisticRequest = (id, transactionId) => ({
    type: actionTypes.REMOVE_SHOW_RATING_OPTIMISTIC_REQUEST,
    payload: {
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const removeShowRatingSuccess = (transactionId) => ({
    type: actionTypes.REMOVE_SHOW_RATING_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const removeShowRatingFailed = (transactionId) => ({
    type: actionTypes.REMOVE_SHOW_RATING_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const removeShowRating = (showId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(removeShowRatingFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(removeShowRatingOptimisticRequest(showId, transactionId));
        const response = await a.request(`api/show/${showId}/rating`, {
            method: 'DELETE'
        });
        dispatch(removeShowRatingSuccess(transactionId));
        toast.success('TV show rating successfully removed');
    } catch (error) {
        dispatch(removeShowRatingFailed(transactionId));
        toast.error(error.response.data);
    }
}