import * as actionTypes from '../actionTypes';


export default function reducer(state = {}, action) {
    switch (action.type) {

        case actionTypes.FETCH_LIST_SUCCESS:
            return {
                ...action.payload.data
            };

        case actionTypes.CLEAR_LIST_SUCCESS:
            return {
                ...state,
                items: [],
                item_count: 0
            };

        case actionTypes.REMOVE_MOVIE_FROM_LIST_SUCCESS:
            return {
                ...state,
                item_count: state.item_count - 1,
                items: state.items.filter(item => item.id !== action.payload.movieId)
            };

        default:
            return state;
    }
}

export function getListData(state) {
    return state.list;
}