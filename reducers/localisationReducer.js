import * as actionTypes from '../actionTypes';

const initialState = {
    language: 'en',
    country: 'GB'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.FETCH_USER_SUMMARY_SUCCESS:
            return {
                language: action.payload.userSummary.iso_639_1,
                country: action.payload.userSummary.iso_3166_1
            };
        
        default:
            return state;

    }
}

