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