import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import Router from 'next/router';

const deleteListOptimisticRequest = (id, transactionId) => ({
    type: actionTypes.DELETE_LIST_OPTIMISTIC_REQUEST,
    payload: {
        id
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const deleteListSuccess = (transactionId) => ({
    type: actionTypes.DELETE_LIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const deleteListFailed = (transactionId) => ({
    type: actionTypes.DELETE_LIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const deleteList = (listId) => async (dispatch, getState) => {
    const transactionId = Date.now();
    try {
        dispatch(deleteListOptimisticRequest(listId, transactionId));
        Router.push({ pathname: '/me/lists' });
        const response = await a.request(`api/list/${listId}`, {
            method: 'DELETE'
        });
        dispatch(deleteListSuccess(transactionId));
        toast.success('List successfully deleted');
    } catch (error) {
        dispatch(deleteListFailed(transactionId));
        toast.error(error.response.data);
    }
};
