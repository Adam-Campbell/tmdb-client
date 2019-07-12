import * as actionTypes from '../actionTypes';
import { isEqual } from 'lodash';

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

        case actionTypes.STORE_USER_SUMMARY:
            return action.payload.userSummary;

        case actionTypes.LOGOUT_USER:
            return initialState;

        default: 
            return state;
    }
}

export function getUserSummary(state) {
    return state.userSummary
}

export function getUserId(state) {
    return state.userSummary.id;
}

export function hasGotUserSummary(state) {
    return !isEqual(state.userSummary, initialState);
}