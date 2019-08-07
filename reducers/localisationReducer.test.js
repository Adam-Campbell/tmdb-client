import * as actionTypes from '../actionTypes';
import reducer from './localisationReducer';

const initialState = {
    language: 'en',
    country: 'GB'
};

test('it returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
});

test('it handles STORE_USER_SUMMARY', () => {
    expect(reducer(initialState, {
        type: actionTypes.STORE_USER_SUMMARY,
        payload: {
            userSummary: {
                iso_639_1: 'de',
                iso_3166_1: 'DEU'
            }
        }
    })).toEqual({
        language: 'de',
        country: 'DEU'
    });
});
