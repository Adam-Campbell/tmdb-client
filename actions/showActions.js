import * as actionTypes from '../actionTypes';
import { getShowDetails, postShowRating, deleteShowRating } from '../Api';
import { getShowId } from '../reducers/showReducer';
import { getUserSessionId } from '../reducers/sessionReducer';

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


export const fetchShow = (id) => async (dispatch, getState) => {
    const state = getState();
    if (id === getShowId(state)) return;

    try {
        const response = await getShowDetails(id, getUserSessionId(state));
        dispatch(fetchShowSuccess(response, id));
    } catch (error) {
        dispatch(fetchShowFailed(error));
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
    const session_id = getUserSessionId(state);
    if (!session_id) {
        dispatch(rateShowFailed('User not logged in'));
        return;
    }
    try {
        const response = await postShowRating(rating, showId, session_id);
        dispatch(rateShowSuccess(rating, showId));
    } catch (error) {
        console.log(error);
        dispatch(rateShowFailed(error));
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
    const session_id = getUserSessionId(state);
    if (!session_id) {
        dispatch(removeShowRatingFailed('User not logged in'));
        return;
    }
    try {
        const response = await deleteShowRating(showId, session_id);
        dispatch(removeShowRatingSuccess(showId));
    } catch (error) {
        //console.log(error);
        dispatch(removeShowRatingFailed(error));
    }
}