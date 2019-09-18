import * as actionTypes from '../../actionTypes';
import { getShowId } from '../../reducers/showReducer';
import { a } from '../../axiosClient';

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

export const fetchShow = (id, ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    if (id === getShowId(state)) return;

    try {
        const response = await a.get(`api/show/${id}`, {
            headers: ssrHeaders
        });
        const showData = response.data;
        showData.credits.cast = showData.credits.cast.sort((a,b) => a.order - b.order);
        dispatch(fetchShowSuccess(showData, id));
    } catch (error) {
        dispatch(fetchShowFailed(error));
        throw new Error(error.response.status);
    }
};
