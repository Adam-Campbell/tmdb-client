import * as actionTypes from '../../actionTypes';
import { getHasSession } from '../../reducers/sessionReducer';
import { getUserId } from '../../reducers/user';
import { getUserDataStatus } from '../../reducers/user/dataStatusReducer';
import { a } from '../../axiosClient';

const fetchFullProfileRequest = () => ({
    type: actionTypes.FETCH_FULL_PROFILE_REQUEST
});

const fetchFullProfileSuccess = (createdLists, favourites, rated, watchlists) => ({
    type: actionTypes.FETCH_FULL_PROFILE_SUCCESS,
    payload: {
        createdLists,
        favourites,
        rated,
        watchlists,
        timestamp: Date.now()
    }
});


const fetchFullProfileFailed = (error) => ({
    type: actionTypes.FETCH_FULL_PROFILE_FAILED,
    payload: {
        error
    }
});

export const fetchFullProfile = (ssrHeaders = {}) => async (dispatch, getState) => {
    
    const state = getState();

    // If we have somehow called this without there being a user session then return immediately
    if (!getHasSession(state)) return;

    const { hasFetched, fetchedAt, isInvalidated } = getUserDataStatus(state); 
    // If all of these conditions are met then the data is present and still considered fresh, so
    // return without fetching.
    if (
        hasFetched && 
        Date.now() - fetchedAt <= 1000 * 60 * 10 && 
        !isInvalidated
    ) {
        return;
    }

    try {

        const userId = getUserId(state);
        const {
            data: {
                createdLists,
                favourites,
                rated,
                watchlists
            }
        } = await a.get(`api/user/${userId}/profile`, { 
            headers: ssrHeaders    
        });

        dispatch(fetchFullProfileSuccess(createdLists, favourites, rated, watchlists));
    } catch (error) {
        dispatch(fetchFullProfileFailed(error));
        throw new Error(error.response.status);
    }
};
