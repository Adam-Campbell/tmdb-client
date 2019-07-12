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

        case actionTypes.MARK_FAVOURITE_SUCCESS:
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

        case actionTypes.EDIT_WATCHLIST_SUCCESS:
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