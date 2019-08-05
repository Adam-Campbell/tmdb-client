/**
 * Given a window tuple, returns either the window tuple just before it, or the same window tuple
 * as given if it happened to be the first one.
 */
function getPrevWindow(window) {
    return window[0] - 10 >= 0
        ? window.map(i => i - 10)
        : window;
}

/**
 * Given a window tuple, returns either the next window tuple, or the same window tuple given if 
 * it happened to reach a specified limit. 
 */
export function getNextWindow(window) {
    return window[1] + 10 <= 400
        ? window.map(i => i + 10)
        : window;
}

/**
 * Tests if a target windows exceeds another window (in other words if the end of the target window comes 
 * after the end of the test window).
 * @param {*} targetWindow 
 * @param {*} testWindow 
 */
export function doesWindowExceed(targetWindow, testWindow) {
    return targetWindow[1] > testWindow[1];
}

/**
 * Returns an array of length 20, where each item is undefined.
 */
function getBlankSpaces() {
    return Array.from({ length: 20 })
}

/**
 * Returns the new card data state derived from existing state plus a new window position. If the new
 * window position doesn't exceed the current furthest window then the same card data state is returned,
 * however if it did exceed it then 20 undefined slots are added to the card data array.
 * @param {*} newWindow 
 * @param {*} state 
 */
function getNextCardData(newWindow, state) {
    const { cardData, furthestWindow } = state;
    return doesWindowExceed(newWindow, furthestWindow) 
        ? [ ...cardData, ...getBlankSpaces() ]
        : cardData;
}

/**
 * Inserts card data at a given point in the cards array, determined by the pageToInset parameter. This
 * function is used when you have already added some undefined slots to the array in anticipation of coming
 * data, and now that the data has arrived you want to replace the undefined slots with the actual data.
 * @param {*} prevData 
 * @param {*} newData 
 * @param {*} pageToInsert 
 */
function insertCardData(prevData, newData, pageToInsert) {
    return [
        ...prevData.slice(0, (pageToInsert - 1) * 20),
        ...newData
    ]
}


export function reducer(state, action) {
    switch (action.type) {
        case 'PAGE_FORWARDS':
            const newWindow = getNextWindow(state.currentWindow);
            return {
                ...state,
                page: state.page + 1,
                cardData: getNextCardData(newWindow, state),
                currentWindow: newWindow,
                furthestWindow: newWindow[0] > state.furthestWindow[0]
                                ? newWindow
                                : state.furthestWindow
            };

        case 'PAGE_BACKWARDS':
            return {
                ...state,
                page: Math.max(state.page - 1, 1),
                currentWindow: getPrevWindow(state.currentWindow),
            };

        case 'STORE_NEXT_CARD_DATA':
            return {
                ...state,
                cardData: insertCardData(
                    state.cardData, 
                    action.payload.nextCardData,
                    action.payload.page
                )
            };

        default:
            return state;
    }
}