import * as actionTypes from '../actionTypes';
import reducer from './sessionReducer';

const initialState = {
    userSessionId: null,
    guestSessionId: null
};

test('it returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
});

test('it handles LOGIN_USER_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.LOGIN_USER_SUCCESS,
        payload: {
            userSessionId: '123456'
        }
    })).toEqual({
        userSessionId: '123456',
        guestSessionId: null
    });
});

test('it handles LOGOUT_USER', () => {
    expect(reducer({
        userSessionId: '123456',
        guestSessionId: null
    }, {
        type: actionTypes.LOGOUT_USER
    })).toEqual({
        userSessionId: null,
        guestSessionId: null
    });
});
