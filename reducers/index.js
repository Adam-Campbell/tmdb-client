import { combineReducers } from 'redux';
import session from './sessionReducer';
import localisation from './localisationReducer';
import movie from './movieReducer';
import show from './showReducer';
import person from './personReducer';
import user from './user';
import season from './seasonReducer';
import list from './listReducer';

export default combineReducers({
    session,
    localisation,
    movie,
    show,
    person,
    user,
    season,
    list
});
