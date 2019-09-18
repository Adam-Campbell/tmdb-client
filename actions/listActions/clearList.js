import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const clearListOptimisticRequest = (id, transactionId) => ({
    type: actionTypes.CLEAR_LIST_OPTIMISTIC_REQUEST,
    payload: {
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const clearListSuccess = (transactionId) => ({
    type: actionTypes.CLEAR_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const clearListFailed = (error, transactionId) => ({
    type: actionTypes.CLEAR_LIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionid
    }
});

export const clearList = (listId) => async (dispatch, getState) => {
    const transactionId = Date.now();
    try {
        dispatch(clearListOptimisticRequest(listId, transactionId));
        const response = await a.request(`api/list/${listId}/clear`, {
            method: 'POST'
        });
        dispatch(clearListSuccess(transactionId));
        toast.success('List successfully cleared');
    } catch (error) {
        console.log(error);
        dispatch(clearListFailed(error, transactionId));
        toast.error(error.response.data);
    }
};
