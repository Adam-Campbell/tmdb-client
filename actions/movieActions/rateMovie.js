import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import { getHasSession } from '../../reducers/sessionReducer';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const rateMovieOptimisticRequest = (rating, id, transactionId) => ({
    type: actionTypes.RATE_MOVIE_OPTIMISTIC_REQUEST,
    payload: {
        rating, 
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const rateMovieSuccess = (rating, id, transactionId) => ({
    type: actionTypes.RATE_MOVIE_SUCCESS,
    payload: {
        rating,
        id
    },
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const rateMovieFailed = (transactionId) => ({
    type: actionTypes.RATE_MOVIE_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const rateMovie = (rating, movieId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(rateMovieOptimisticRequest(rating, movieId, transactionId));
        const response = await a.request(`api/movie/${movieId}/rating`, {
            params: { rating },
            method: 'POST'
        });
        dispatch(rateMovieSuccess(rating, movieId, transactionId));
        toast.success('Movie successfully rated');
    } catch (error) {
        dispatch(rateMovieFailed(transactionId));
        toast.error(error.response.data);
    }
};
