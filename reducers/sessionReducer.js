import * as actionTypes from '../actionTypes';

export const initialState = {
    hasSession: false,
    hasSessionCreationError: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                hasSession: true
            };

        case actionTypes.LOGIN_USER_FAILED:
            return {
                ...state,
                hasSession: false,
                hasSessionCreationError: true
            };

        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                hasSession: false,
                hasSessionCreationError: false
            };

        default:
            return state;
    }
}

export function getHasSession(state) {
    return state.session.hasSession;
}

export function getHasSessionCreationError(state) {
    return state.session.hasSessionCreationError;
}