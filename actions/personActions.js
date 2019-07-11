import * as actionTypes from '../actionTypes';
import { getPersonId } from '../reducers/personReducer';
import { getPersonDetails } from '../Api';

const fetchPersonRequest = () => ({
    type: actionTypes.FETCH_PERSON_REQUEST
});

const fetchPersonSuccess = (data, id) => ({
    type: actionTypes.FETCH_PERSON_SUCCESS,
    payload: {
        data,
        id
    }
});

const fetchPersonFailed = (error) => ({
    type: actionTypes.FETCH_PERSON_FAILED,
    payload: {
        error
    }
});

export const fetchPerson = (id) => async (dispatch, getState) => {
    const state = getState();
    if (id === getPersonId(state)) return;

    try {
        const response = await getPersonDetails(id);
        dispatch(fetchPersonSuccess(response, id));
    } catch (error) {
        dispatch(fetchPersonFailed(error));
    }
}