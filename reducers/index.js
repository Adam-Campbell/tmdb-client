import { combineReducers } from 'redux';
import session from './sessionReducer';
import userSummary from './userSummaryReducer';
import localisation from './localisationReducer';
import movie from './movieReducer';

export default combineReducers({
    session,
    userSummary,
    localisation,
    movie
});
