import * as actionTypes from '../actionTypes';
import { getHasSession } from '../reducers/sessionReducer';
import { getShowId, getShowData } from '../reducers/showReducer';
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
        const showData = response.data;
        showData.credits.cast = showData.credits.cast.sort((a,b) => a.order - b.order);
        dispatch(fetchShowSuccess(showData, id));
    } catch (error) {
        dispatch(fetchShowFailed(error));
        throw new Error(error.response.status);
    }
}

const rateShowOptimisticSuccess = (rating, id) => ({
    type: actionTypes.RATE_SHOW_OPTIMISTIC_SUCCESS,
    payload: {
        rating,
        id
    }
});

const rateShowFailed = (error, id, prevRating) => ({
    type: actionTypes.RATE_SHOW_FAILED,
    payload: {
        error,
        id, 
        prevRating
    }
});


export const rateShow = (rating, showId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(rateShowFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    // Here we will capture the previous rating, which will either be a numeric value
    // if there was a previous rating, or null if there was no rating. 
    const showData = getShowData(state);
    const prevRating = showData.account_states.rated;
    try {
        dispatch(rateShowOptimisticSuccess(rating, showId));
        const response = await a.request(`api/show/${showId}/rating`, {
            params: { rating },
            method: 'POST'
        });
        toast.success('TV show successfully rated');
    } catch (error) {
        dispatch(rateShowFailed(error, showId, prevRating));
        toast.error(error.response.data);
    }
}

const removeShowRatingOptimisticSuccess = (id) => ({
    type: actionTypes.REMOVE_SHOW_RATING_OPTIMISTIC_SUCCESS,
    payload: {
        id
    }
});

const removeShowRatingFailed = (error, id, prevRating) => ({
    type: actionTypes.REMOVE_SHOW_RATING_FAILED,
    payload: {
        error,
        id,
        prevRating
    }
});

export const removeShowRating = (showId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(removeShowRatingFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    const showData = getShowData(state);
    const prevRating = showData.account_states.rated;
    try {
        dispatch(removeShowRatingOptimisticSuccess(showId));
        const response = await a.request(`api/show/${showId}/rating`, {
            method: 'DELETE'
        });
        toast.success('TV show rating successfully removed');
    } catch (error) {
        console.log(error);
        dispatch(removeShowRatingFailed(error, showId, prevRating));
        toast.error(error.response.data);
    }
}