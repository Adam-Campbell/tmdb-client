export const actionConstants = {
    OPEN_MENU: 'OPEN_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
    UPDATE_LOCAL_SELECTION: 'UPDATE_LOCAL_SELECTION',
    CONFIRM_SELECTION: 'CONFIRM_SELECTION'
};

export function reducer(state, action) {
    switch (action.type) {
        case actionConstants.OPEN_MENU:
            return {
                isOpen: true, 
                localSelected: action.payload.localSelected
            };
        case actionConstants.CLOSE_MENU:
            return {
                isOpen: false,
                localSelected: action.payload.currentValue
            };
        case actionConstants.UPDATE_LOCAL_SELECTION:
            return {
                ...state,
                localSelected: action.payload.localSelected
            };
        case actionConstants.CONFIRM_SELECTION:
            return {
                isOpen: false,
                localSelected: action.payload.newValue
            }
    }
}