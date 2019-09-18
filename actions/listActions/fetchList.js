import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';

const fetchListRequest = (id) => ({
    type: actionTypes.FETCH_LIST_REQUEST,
    payload: {
        id
    }
});

const fetchListSuccess = (data, id) => ({
    type: actionTypes.FETCH_LIST_SUCCESS,
    payload: {
        data,
        id
    }
});

const fetchListFailed = (error) => ({
    type: actionTypes.FETCH_LIST_FAILED,
    payload: {
        error
    }
});

export const fetchList = (listId) => async (dispatch) => {
    dispatch(fetchListRequest(listId));
    try {
        const response = await a.get(`api/list/${listId}`);
        dispatch(fetchListSuccess(response.data, listId));
    } catch (error) {
        dispatch(fetchListFailed(error));
        throw new Error(error.response.status);
    }
};
