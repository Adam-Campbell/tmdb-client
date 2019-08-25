import * as actionTypes from '../actionTypes';
import reducer from './sessionReducer';

const initialState = {
    hasSession: false
};

const withSessionState = {
    hasSession: true
};

test('it returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
});

test('it handles LOGIN_USER_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.LOGIN_USER_SUCCESS,
    })).toEqual(withSessionState);
});

test('it handles LOGOUT_USER', () => {
    expect(reducer(withSessionState, {
        type: actionTypes.LOGOUT_USER
    })).toEqual(initialState);
});
