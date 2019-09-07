import * as actionTypes from '../../actionTypes';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_FULL_PROFILE_SUCCESS:
            return action.payload.createdLists;

        // The optimistic update doesn't know the id yet so it creates a list object with an
        // id of -1
        case actionTypes.CREATE_LIST_OPTIMISTIC_REQUEST:
            return [
                action.payload.list,
                ...state
            ];
        
        // Once the request has completed and the actual list id is known, replace the -1 with
        // the actual id
        case actionTypes.CREATE_LIST_SUCCESS:
            return state.map(list => {
                return list.id === -1 ? {
                    ...list, 
                    id: action.payload.id
                } :
                list
            });

        case actionTypes.DELETE_LIST_OPTIMISTIC_REQUEST:
            return state.filter(list => list.id !== action.payload.id);

        case actionTypes.ADD_MOVIE_TO_LIST_OPTIMISTIC_REQUEST:
            return state.map(list => {
                return list.id === action.payload.listId ? {
                    ...list, 
                    item_count: list.item_count + 1
                } :
                list
            });

        case actionTypes.REMOVE_MOVIE_FROM_LIST_OPTIMISTIC_REQUEST:
            return state.map(list => {
                return list.id === action.payload.listId ? {
                    ...list,
                    item_count: list.item_count - 1
                } :
                list
            });

        case actionTypes.CLEAR_LIST_OPTIMISTIC_REQUEST:
            return state.map(list => {
                return list.id === action.payload.listId ? {
                    ...list,
                    item_count: 0
                } :
                list
            });
        

        case actionTypes.LOGOUT_USER:
            return initialState;

        default: 
            return state;
    }
}