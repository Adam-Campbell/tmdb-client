import * as actionTypes from '../../actionTypes';

const initialState = {
    avatar: {},
    id: '',
    iso_639_1: '',
    iso_3166_1: '',
    name: '',
    include_adult: false,
    username: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_USER_SUMMARY_SUCCESS:
            return action.payload.userSummary;

        case actionTypes.LOGOUT_USER:
            return initialState;

        default: 
            return state;
    }
}