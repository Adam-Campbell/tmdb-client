import * as actionTypes from '../../actionTypes';

const initialState = {
    movies: [],
    shows: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_FULL_PROFILE_SUCCESS:
            return action.payload.watchlists;

        case actionTypes.LOGOUT_USER:
            return initialState;

        case actionTypes.EDIT_WATCHLIST_SUCCESS:
            {
                const key = action.payload.mediaType === 'movie' ? 'movies' : 'shows';
                return action.payload.isAdding ? state : {
                    ...state,
                    [key]: state[key].filter(el => el.id !== action.payload.id)
                };
            }

        default: 
            return state;
    }
}