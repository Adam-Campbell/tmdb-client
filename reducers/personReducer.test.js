import * as actionTypes from '../actionTypes';
import reducer from './personReducer';

const initialState = {
    id: null,
    data: {}
};

test('it returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
});

test('it handles FETCH_PERSON_SUCCESS', () => {

    const personData = {
        name: 'Keanu Reeves',
        known_for_department: 'Acting',
        birthday: '1964-09-02'
    };

    expect(reducer(undefined, {
        type: actionTypes.FETCH_PERSON_SUCCESS,
        payload: {
            id: '6384',
            data: personData
        }
    })).toEqual({
        id: '6384',
        data: personData
    });
});
