import * as actionTypes from '../actionTypes';
import reducer from './listReducer';

const mockListData = {
    created_by: 'user_foo',
    description: 'A playlist description',
    favorite_count: 0,
    id: 987,
    items: [
        { id: 123 },
        { id: 456 }
    ],
    item_count: 2,
    iso_639_1: 'en',
    name: 'My playlist',
    poster_path: null
}

test('it returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('it handles FETCH_LIST_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_LIST_SUCCESS,
        payload: {
            data: mockListData
        }
    })).toEqual(mockListData);
});

test('it handles CLEAR_LIST_SUCCESS', () => {
    expect(reducer(mockListData, {
        type: actionTypes.CLEAR_LIST_SUCCESS
    })).toEqual({
        ...mockListData, 
        items: [],
        item_count: 0
    });
});

test('it handles REMOVE_MOVIE_FROM_LIST_SUCCESS', () => {
    expect(reducer(mockListData, {
        type: actionTypes.REMOVE_MOVIE_FROM_LIST_SUCCESS,
        payload: {
            movieId: 456
        }
    })).toEqual({
        ...mockListData,
        items: [
            { id: 123 }
        ],
        item_count: 1
    });
});
