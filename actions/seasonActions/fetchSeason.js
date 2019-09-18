import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import { getSeasonIdentifiers } from '../../reducers/seasonReducer';

const fetchSeasonRequest = () => ({
    type: actionTypes.FETCH_SEASON_REQUEST
});

const fetchSeasonSuccess = (data, showId, seasonNumber) => ({
    type: actionTypes.FETCH_SEASON_SUCCESS,
    payload: {
        data,
        showId,
        seasonNumber
    }
});

const fetchSeasonFailed = (error) => ({
    type: actionTypes.FETCH_SEASON_FAILED,
    payload: {
        error
    }
});

export const fetchSeason = (showId, seasonNumber, ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    const cached = getSeasonIdentifiers(state);
    if (showId === cached.showId && seasonNumber === cached.seasonNumber) return;
    
    try {
        dispatch(fetchSeasonRequest());
        const response = await a.get(`api/show/${showId}/season/${seasonNumber}`, {
            headers: ssrHeaders
        });
        dispatch(fetchSeasonSuccess(response.data, showId, seasonNumber));
    } catch (error) {
        dispatch(fetchSeasonFailed(error));
        throw new Error(error.response.status);
    }
};
