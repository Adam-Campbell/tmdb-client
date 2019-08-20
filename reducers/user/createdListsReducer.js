import * as actionTypes from '../../actionTypes';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_FULL_PROFILE_SUCCESS:
            return action.payload.createdLists;

        case actionTypes.DELETE_LIST_SUCCESS:
            return state.filter(list => list.id !== action.payload.id);

        case actionTypes.LOGOUT_USER:
            return initialState;

        default: 
            return state;
    }
}