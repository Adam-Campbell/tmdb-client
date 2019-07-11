import * as actionTypes from '../actionTypes';
import { getShowDetails } from '../Api';
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

/*

    Check if show has already been fetched, if so then early return.

    If it hasn't been fetched, then call the API function. 

    Dispatch _SUCCESS or _FAILED action as appropriate. 

*/

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


