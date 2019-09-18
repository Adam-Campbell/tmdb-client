import * as actionTypes from '../../actionTypes';
import { getHasSession } from '../../reducers/sessionReducer';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

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
};
