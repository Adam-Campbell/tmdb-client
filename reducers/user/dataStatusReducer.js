import * as actionTypes from '../../actionTypes';

const initialState = {
    hasFetched: false,
    fetchedAt: null,
    isInvalidated: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_FULL_PROFILE_SUCCESS:
            return {
                hasFetched: true,
                fetchedAt: action.payload.timestamp,
                isInvalidated: false
            };

        case actionTypes.LOGOUT_USER:
            return initialState;

        case actionTypes.MARK_FAVOURITE_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.EDIT_WATCHLIST_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.RATE_MOVIE_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.REMOVE_MOVIE_RATING_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.RATE_SHOW_OPTIMISTIC_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.REMOVE_SHOW_RATING_OPTIMISTIC_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.CLEAR_LIST_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.DELETE_LIST_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.REMOVE_MOVIE_FROM_LIST_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.CREATE_LIST_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        case actionTypes.ADD_MOVIE_TO_LIST_SUCCESS:
            return {
                ...state,
                isInvalidated: true
            };

        default:
            return state;
    }
}

export function getUserDataStatus(state) {
    return state.user.dataStatus;
}