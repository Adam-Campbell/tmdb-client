import * as actionTypes from '../actionTypes';

const initialState = {
    id: null,
    data: {}
}

export default function reducer(state = {}, action) {
    switch (action.type) {

        case actionTypes.FETCH_LIST_SUCCESS:
            return {
                id: action.payload.id,
                data: {
                    ...action.payload.data
                }
            };

        case actionTypes.CLEAR_LIST_OPTIMISTIC_REQUEST:
            return action.payload.id === state.id ? {
                id: state.id,
                data: {
                    ...state.data,
                    items: [],
                    item_count: 0
                }
            } :
            state;

        case actionTypes.ADD_MOVIE_TO_LIST_OPTIMISTIC_REQUEST:
            return action.payload.listId === state.id ?
                {
                    id: state.id,
                    data: {
                        ...state.data, 
                        items: [ ...state.data.items, action.payload.movie ],
                        item_count: state.data.item_count + 1
                    }
                } :
                state;

        case actionTypes.REMOVE_MOVIE_FROM_LIST_OPTIMISTIC_REQUEST:
            return action.payload.listId === state.id ? {
                id: state.id,
                data: {
                    ...state.data,
                    item_count: state.data.item_count - 1,
                    items: state.data.items.filter(item => item.id !== action.payload.movieId)
                }
            } :
            state;

        default:
            return state;
    }
}

export function getListData(state) {
    return state.list.data;
}
