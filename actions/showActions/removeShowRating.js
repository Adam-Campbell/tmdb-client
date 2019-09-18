import * as actionTypes from '../../actionTypes';
import { getHasSession } from '../../reducers/sessionReducer';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

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
};
