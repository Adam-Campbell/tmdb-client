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