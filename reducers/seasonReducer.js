import * as actionTypes from '../actionTypes';

const initialState = {
    showId: null,
    seasonNumber: null,
    data: {}
};

function isCorrectSeason(state, action) {
    return state.showId === action.payload.showId && state.seasonNumber === action.payload.seasonNumber;
}

function updateAccountStatesArray(accountStatesArray, episodeNumber, newRatingValue) {
    return accountStatesArray.map(episode => {
        return episode.episode_number === episodeNumber
        ? { 
            ...episode, 
            rated: newRatingValue 
        }
        : episode
    });
}

function updateEpisodeRating(state, episodeNumber, rating) {
    return {
        ...state,
        data: {
            ...state.data,
            account_states: {
                results: updateAccountStatesArray(
                    state.data.account_states.results,
                    episodeNumber,
                    rating
                )
            }
        }
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_SEASON_SUCCESS:
            return {
                showId: action.payload.showId,
                seasonNumber: action.payload.seasonNumber,
                data: action.payload.data
            };

        case actionTypes.RATE_EPISODE_OPTIMISTIC_REQUEST:
            return isCorrectSeason(state, action) ? 
                    updateEpisodeRating(
                        state, 
                        action.payload.episodeNumber, 
                        { value: action.payload.rating }
                    ) :
                    state;

        case actionTypes.REMOVE_EPISODE_RATING_OPTIMISTIC_REQUEST:
            return isCorrectSeason(state, action) ?
                    updateEpisodeRating(state, action.payload.episodeNumber, false) :
                    state;

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