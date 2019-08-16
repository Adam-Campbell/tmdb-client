import * as actionTypes from '../actionTypes';

const initialState = {
    hasSession: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                //userSessionId: action.payload.userSessionId
                hasSession: true
            };

        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                //userSessionId: null
                hasSession: false
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

export function getHasSession(state) {
    return state.session.hasSession;
}

export function getUserSessionId(state) {
    return state.session.userSessionId
}