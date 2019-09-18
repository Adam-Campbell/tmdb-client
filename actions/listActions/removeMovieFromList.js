import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const removeMovieFromListOptimisticRequest = (listId, movieId, transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_OPTIMISTIC_REQUEST,
    payload: {
        listId,
        movieId
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const removeMovieFromListSuccess = (transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const removeMovieFromListFailed = (error, transactionId) => ({
    type: actionTypes.REMOVE_MOVIE_FROM_LIST_FAILED,
    payload: {
        error
    },
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const removeMovieFromList = (listId, movieId) => async (dispatch, getState) => {
    const transactionId = Date.now();
    try {
        dispatch(removeMovieFromListOptimisticRequest(listId, movieId, transactionId));
        const response = await a.request(`api/list/${listId}/remove-item`, {
            method: 'POST',
            data: {
                movieId
            }
        });
        dispatch(removeMovieFromListSuccess(transactionId));
        toast.success('Movie successfully removed from list');
    } catch (error) {
        dispatch(removeMovieFromListFailed(error, transactionId));
        toast.error(error.response.data);
    }
};
