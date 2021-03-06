import * as actionTypes from '../actionTypes';

const initialState = {
    id: null,
    data: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_MOVIE_SUCCESS:
            return {
                id: action.payload.id,
                data: action.payload.data
            };

        case actionTypes.MARK_FAVOURITE_OPTIMISTIC_REQUEST:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            favorite: action.payload.isMarking
                        }
                    }
                };

        case actionTypes.EDIT_WATCHLIST_OPTIMISTIC_REQUEST:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            watchlist: action.payload.isAdding
                        }
                    }
                };

        case actionTypes.RATE_MOVIE_OPTIMISTIC_REQUEST:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            rated: {
                                value: action.payload.rating
                            }
                        }
                    }
                };

        case actionTypes.REMOVE_MOVIE_RATING_OPTIMISTIC_REQUEST:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            rated: false
                        }
                    }
                };

        default: 
            return state;
    }
}

export function getMovieData(state) {
    return state.movie.data
}

export function getMovieId(state) {
    return state.movie.id
}