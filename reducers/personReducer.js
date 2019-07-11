import * as actionTypes from '../actionTypes';

const initialState = {
    id: null,
    data: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_PERSON_SUCCESS:
            return {
                id: action.payload.id,
                data: action.payload.data
            };

        default: 
            return state;
    }
}

export function getPersonData(state) {
    return state.person.data
}

export function getPersonId(state) {
    return state.person.id
}