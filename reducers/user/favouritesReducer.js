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

        default: 
            return state;
    }
}