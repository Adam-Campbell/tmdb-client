import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import { getHasSession } from '../../reducers/sessionReducer';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const removeMovieRatingOptimisticRequest = (id, transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_RATING_OPTIMISTIC_REQUEST,
    payload: {
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const removeMovieRatingSuccess = (transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_RATING_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const removeMovieRatingFailed = (transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_RATING_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const removeMovieRating = (movieId) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(removeMovieRatingOptimisticRequest(movieId, transactionId));
        const response = await a.request(`api/movie/${movieId}/rating`, {
            method: 'DELETE'
        });
        dispatch(removeMovieRatingSuccess(transactionId));
        toast.success('Movie rating successfully removed');
    } catch (error) {
        dispatch(removeMovieRatingFailed(transactionId));
        toast.error(error.response.data);
    }
};
