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

        case actionTypes.RATE_EPISODE_SUCCESS:
            // todo
            if (state.showId !== action.payload.showId || state.seasonNumber !== action.payload.seasonNumber) {
                return state;
            } else {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            results: state.data.account_states.results.map(episode => {
                                return episode.episode_number === action.payload.episodeNumber 
                                ? {
                                    ...episode,
                                    rated: { value: action.payload.rating }
                                } 
                                : episode;
                            })
                        }
                    }
                };
            }

        case actionTypes.REMOVE_EPISODE_RATING_SUCCESS:
            // todo
            if (state.showId !== action.payload.showId || state.seasonNumber !== action.payload.seasonNumber) {
                return state;
            } else {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            results: state.data.account_states.results.map(episode => {
                                return episode.episode_number === action.payload.episodeNumber 
                                ? {
                                    ...episode,
                                    rated: false
                                } 
                                : episode;
                            })
                        }
                    }
                };
            }

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