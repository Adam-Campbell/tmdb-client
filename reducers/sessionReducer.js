import * as actionTypes from '../actionTypes';

const initialState = {
    userSessionId: null,
    guestSessionId: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                userSessionId: action.payload.userSessionId
            };

        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                userSessionId: null
            };

        default:
            return state;
    }
}

export function getSessionType(state) {
    if (state.session.userSessionId !== null) {
        return 'USER';
    } else if (state.session.guestSessionId !== null) {
        return 'GUEST';
    } else {
        return null;
    }
}

export function getUserSessionId(state) {
    return state.session.userSessionId
}