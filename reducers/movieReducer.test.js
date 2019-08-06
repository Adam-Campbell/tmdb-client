import * as actionTypes from '../actionTypes';
import reducer from './movieReducer';

const initialState = {
    id: null,
    data: {}
};


test('it returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
});

test('it handles FETCH_MOVIE_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_MOVIE_SUCCESS,
        payload: {
            id: 458156,
            data: {
                id: 458156,
                title: 'John Wick: Chapter 3 - Parabellum',
                release_date: '2019-05-15',
                account_states: {
                    favorite: false,
                    rated: false,
                    watchlist: false
                }
            }
        }
    })).toEqual({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: false,
                watchlist: false
            }
        }
    });
});

test('it handles MARK_FAVOURITE_SUCCESS', () => {
    expect(reducer({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: false,
                watchlist: false
            }
        }
    }, {
        type: actionTypes.MARK_FAVOURITE_SUCCESS,
        payload: {
            id: 458156,
            isMarking: true
        }
    })).toEqual({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: true,
                rated: false,
                watchlist: false
            }
        }
    });
});

test('it handles EDIT_WATCHLIST_SUCCESS', () => {
    expect(reducer({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: false,
                watchlist: false
            }
        }
    }, {
        type: actionTypes.EDIT_WATCHLIST_SUCCESS,
        payload: {
            id: 458156,
            isAdding: true
        }
    })).toEqual({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: false,
                watchlist: true
            }
        }
    });
});

test('it handles RATE_MOVIE_SUCCESS', () => {
    expect(reducer({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: false,
                watchlist: false
            }
        }
    }, {
        type: actionTypes.RATE_MOVIE_SUCCESS,
        payload: {
            id: 458156,
            rating: 7
        }
    })).toEqual({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: {
                    value: 7
                },
                watchlist: false
            }
        }
    });
});

test('it handles REMOVE_MOVIE_RATING_SUCCESS', () => {
    expect(reducer({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: {
                    value: 7
                },
                watchlist: false
            }
        }
    }, {
        type: actionTypes.REMOVE_MOVIE_RATING_SUCCESS,
        payload: {
            id: 458156,
        }
    })).toEqual({
        id: 458156,
        data: {
            id: 458156,
            title: 'John Wick: Chapter 3 - Parabellum',
            release_date: '2019-05-15',
            account_states: {
                favorite: false,
                rated: false,
                watchlist: false
            }
        }
    });
});
