import * as actionTypes from '../actionTypes';

const initialState = {
    id: null,
    data: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_SHOW_SUCCESS:
            return {
                id: action.payload.id,
                data: action.payload.data
            };

        default: 
            return state;
    }
}

export function getShowData(state) {
    return state.show.data
}

export function getShowId(state) {
    return state.show.id
}