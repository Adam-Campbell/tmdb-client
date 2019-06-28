export const actionConstants = {
    OPEN_MENU: 'OPEN_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
    UPDATE_LOCAL_SELECTION: 'UPDATE_LOCAL_SELECTION',
    CONFIRM_SELECTION: 'CONFIRM_SELECTION',
    UPDATE_SEARCH_STRING: 'UPDATE_SEARCH_STRING'
};

export function reducer(state, action) {
    switch (action.type) {
        case actionConstants.OPEN_MENU:
            return {
                ...state,
                isOpen: true, 
                localSelected: action.payload.localSelected,
                searchString: '',
                lastSearchUpdateTimestamp: null
            };
        case actionConstants.CLOSE_MENU:
            return {
                ...state,
                isOpen: false,
                localSelected: action.payload.currentValue,
                searchString: '',
                lastSearchUpdateTimestamp: null
            };
        case actionConstants.UPDATE_LOCAL_SELECTION:
            return {
                ...state,
                localSelected: action.payload.localSelected,
                searchString: '',
                lastSearchUpdateTimestamp: null
            };
        case actionConstants.CONFIRM_SELECTION:
            return {
                ...state,
                isOpen: false,
                localSelected: action.payload.newValue,
                searchString: '',
                lastSearchUpdateTimestamp: null
            }
        case actionConstants.UPDATE_SEARCH_STRING:
            return {
                ...state, 
                searchString: action.payload.searchString,
                lastSearchUpdateTimestamp: action.payload.timestamp,
                localSelected: action.payload.newLocalSelected
            };
    }
}