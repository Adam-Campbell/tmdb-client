import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const createListOptimisticRequest = (list, transactionId) => ({
    type: actionTypes.CREATE_LIST_OPTIMISTIC_REQUEST,
    payload: {
        list
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const createListSuccess = (id, transactionId) => ({
    type: actionTypes.CREATE_LIST_SUCCESS,
    payload: {
        id
    },
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const createListFailed = (transactionId) => ({
    type: actionTypes.CREATE_LIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const createList = (listName, listDescription, listLanguage) => async (dispatch, getState) => {
    const temporaryListData = {
        description: listDescription || '',
        favorite_count: 0,
        id: -1,
        item_count: 0,
        iso_639_1: 'en',
        list_type: 'movie',
        name: listName,
        poster_path: null
    };
    const transactionId = Date.now();
    try {
        dispatch(createListOptimisticRequest(temporaryListData, transactionId));
        const response = await a.request('api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: listName,
                description: listDescription
            }
        });
        dispatch(createListSuccess(response.data.list_id, transactionId));
        toast.success('List successfully created');
    } catch (error) {
        dispatch(createListFailed(transactionId));
        toast.error(error.response.data);
    }
};
