import { combineReducers } from 'redux';
import session from './sessionReducer';
import userSummary from './userSummaryReducer';
import localisation from './localisationReducer';
import movie from './movieReducer';
import show from './showReducer';

export default combineReducers({
    session,
    userSummary,
    localisation,
    movie,
    show
});
