import * as actionTypes from '../actionTypes';

const initialState = {
    showId: null,
    seasonNumber: null,
    data: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_SEASON_SUCCESS:
            return {
                showId: action.payload.showId,
                seasonNumber: action.payload.seasonNumber,
                data: action.payload.data
            };

        default:
            return state;
    }
}

export function getSeasonIdentifiers(state) {
    return {
        showId: state.season.showId,
        seasonNumber: state.season.seasonNumber
    }
}

export function getSeasonData(state) {
    return state.season.data
}