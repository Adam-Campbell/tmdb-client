import { combineReducers } from 'redux';
import summary from './summaryReducer';
import createdLists from './createdListsReducer';
import favourites from './favouritesReducer';
import rated from './ratedReducer';
import watchlists from './watchlistsReducer';
import dataStatus from './dataStatusReducer';

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