import { combineReducers } from 'redux';
import summary from './summaryReducer';
import createdLists from './createdListsReducer';
import favourites from './favouritesReducer';
import rated from './ratedReducer';
import watchlists from './watchlistsReducer';
import dataStatus from './dataStatusReducer';
import { isEqual } from 'lodash';

export default combineReducers({
    summary,
    createdLists,
    favourites,
    rated,
    watchlists,
    dataStatus
});

export function getUsersRatings(state) {
    return state.user.rated
}

export function getUsersFavourites(state) {
    return state.user.favourites
}

export function getUsersWatchlists(state) {
    return state.user.watchlists
}

export function getUserSummary(state) {
    return state.user.summary
}

export function getUserId(state) {
    return state.user.summary.id;
}

export function hasGotUserSummary(state) {
    return !isEqual(state.user.summary, {
        avatar: {},
        id: '',
        iso_639_1: '',
        iso_3166_1: '',
        name: '',
        include_adult: false,
        username: ''
    });
}