import { combineReducers } from 'redux';
import session from './sessionReducer';
import userSummary from './userSummaryReducer';
import localisation from './localisationReducer';
import movie from './movieReducer';
import show from './showReducer';
import person from './personReducer';

export default combineReducers({
    session,
    userSummary,
    localisation,
    movie,
    show,
    person
});
