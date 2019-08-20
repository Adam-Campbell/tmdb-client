import * as actionTypes from '../actionTypes';
import { getHasSession } from '../reducers/sessionReducer';
import { getShowId } from '../reducers/showReducer';
import { a } from '../axiosClient';
import toast from '../toast';

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
        dispatch(fetchShowSuccess(response.data, id));
    } catch (error) {
        dispatch(fetchShowFailed(error));
        throw new Error(error.response.status);
    }
}

const rateShowSuccess = (rating, id) => ({
    type: actionTypes.RATE_SHOW_SUCCESS,
    payload: {
        rating,
        id
    }
});

const rateShowFailed = (error) => ({
    type: actionTypes.RATE_SHOW_FAILED,
    payload: {
        error
    }
});


export const rateShow = (rating, showId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(rateShowFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    try {
        const response = await a.request(`api/show/${showId}/rating`, {
            params: { rating },
            method: 'POST'
        });
        dispatch(rateShowSuccess(rating, showId));
        toast.success('TV show successfully rated');
    } catch (error) {
        dispatch(rateShowFailed(error));
        toast.error(error.response.data);
    }
}

const removeShowRatingSuccess = (id) => ({
    type: actionTypes.REMOVE_SHOW_RATING_SUCCESS,
    payload: {
        id
    }
});

const removeShowRatingFailed = (error) => ({
    type: actionTypes.REMOVE_SHOW_RATING_FAILED,
    payload: {
        error
    }
});

export const removeShowRating = (showId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(removeShowRatingFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    try {
        const response = await a.request(`api/show/${showId}/rating`, {
            method: 'DELETE'
        });
        dispatch(removeShowRatingSuccess(showId));
        toast.success('TV show rating successfully removed');
    } catch (error) {
        dispatch(removeShowRatingFailed(error));
        toast.error(error.response.data);
    }
}