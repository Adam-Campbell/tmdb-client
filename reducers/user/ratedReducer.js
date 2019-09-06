import * as actionTypes from '../../actionTypes';

const initialState = {
    movies: [],
    shows: [],
    episodes: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_FULL_PROFILE_SUCCESS:
            return action.payload.rated;

        case actionTypes.LOGOUT_USER:
            return initialState;

        case actionTypes.RATE_MOVIE_OPTIMISTIC_REQUEST:
            return {
                ...state,
                movies: state.movies.map(movie => {
                    return movie.id === action.payload.id ?
                    { 
                        ...movie,
                        rating: action.payload.rating 
                    } :
                    movie
                })
            };

        case actionTypes.REMOVE_MOVIE_RATING_OPTIMISTIC_REQUEST:
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.payload.id)
            }

        default: 
            return state;
    }
}