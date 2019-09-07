import * as actionTypes from '../../actionTypes';

const initialState = {
    movies: [],
    shows: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_FULL_PROFILE_SUCCESS:
            return action.payload.favourites;

        case actionTypes.LOGOUT_USER:
            return initialState;

        case actionTypes.MARK_FAVOURITE_OPTIMISTIC_REQUEST:
            {
                const key = action.payload.mediaType === 'movie' ? 'movies' : 'shows';
                return action.payload.isMarking ? state : {
                    ...state,
                    [key]: state[key].filter(el => el.id !== action.payload.id)
                };
            }

        default: 
            return state;
    }
}