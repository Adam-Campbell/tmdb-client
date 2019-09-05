import * as actionTypes from '../actionTypes';

const initialState = {
    id: null,
    data: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_SHOW_SUCCESS:
            return {
                id: action.payload.id,
                data: action.payload.data
            };

        case actionTypes.MARK_FAVOURITE_SUCCESS:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            favorite: action.payload.isMarking
                        }
                    }
                };

        case actionTypes.EDIT_WATCHLIST_SUCCESS:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            watchlist: action.payload.isAdding
                        }
                    }
                };

        case actionTypes.RATE_SHOW_OPTIMISTIC_SUCCESS:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            rated: {
                                value: action.payload.rating
                            }
                        }
                    }
                };
        
        case actionTypes.RATE_SHOW_FAILED:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            rated: action.payload.prevRating
                        }
                    }
                };
    
        case actionTypes.REMOVE_SHOW_RATING_OPTIMISTIC_SUCCESS:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            rated: false
                        }
                    }
                };

        case actionTypes.REMOVE_SHOW_RATING_FAILED:
            return action.payload.id !== state.id ?
                state :
                {
                    ...state,
                    data: {
                        ...state.data,
                        account_states: {
                            ...state.data.account_states,
                            rated: action.payload.prevRating
                        }
                    }
                };

        default: 
            return state;
    }
}

export function getShowData(state) {
    return state.show.data
}

export function getShowId(state) {
    return state.show.id
}