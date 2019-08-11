/**
 * Accepts two refs representing the cards at the start and end of a window, and calculates 
 * the distance from the top of the starting card to the bottom of the end card.
 * @param {Object} windowStartRef - the ref for the card at the start of the window 
 * @param {Object} windowEndRef  - the ref for the card at the end of the window
 * @returns {Number} - the distance calculated
 */
export function calculateWindowHeight(windowStartRef, windowEndRef) {
    if (!windowStartRef.current || !windowEndRef.current) return 0;
    const windowTop = windowStartRef.current.getBoundingClientRect().top;
    const windowBottom = windowEndRef.current.getBoundingClientRect().bottom;
    const windowHeight = windowBottom - windowTop;
    return windowHeight;
}

/**
 * Given a page number, derives the subarray of the main data array that that page represents, 
 * and returns a tuple where the first element represents the start of that subarray, and the
 * second element represents the element AFTER the last element in the subarray. The element 
 * after the end of the subarray is used because everywhere that this function is used it is
 * the element after the subarray that we care about, therefore it makes more sense to just 
 * return it rather than to constantly be adding 1 to the second element of the tuple.
 * @param {Number} p - the page from which to derive the window / subarray. 
 * @returns {Array} - a tuple containing the start index of the subarray and the index after
 * the end of the subarray
 */
export function deriveWindowFromPage(page) {

    // Page should never be less than 1, so is guarded here in case this function 
    // ever gets called with a value less than 1.
    const p = Math.max(1, page);

    return [
        (p-1) * 10,
        (p+1) * 10
    ];
}

/**
 * Given a page of local data, determines which Api results page corresponds to the given
 * local page.
 * @param {Number} p - the local page to derive from
 * @returns {Number} - the Api results page derived from the local page.
 */
export function deriveApiPageFromPage(page) {
    const p = Math.max(1, page);
    return Math.floor(p / 2) + 1;
}


export function getNextPage(page) {
    return Math.min(page + 1, 20);
}

export function getPrevPage(page) {
    return Math.max(page - 1, 1);
}

/**
 * Given a string representation of an elements padding, extracts the numeric value from the string.
 * @param {String} paddingString - string representation of padding.
 * @returns {Number} - numeric representation of padding
 */
export function getPaddingNum(paddingString) {
    if (!paddingString) return 0;
    return parseInt(paddingString.replace('px', ''));
}

/**
 * Given a numeric representation of a px amount, returns a corresponding string representation. 
 * @param {Number} num - numeric representation of px value. 
 * @returns {String} - the string representation of the px value.
 */
export function setPx(num) {
    return `${Math.max(0, num)}px`;
}


/**
 * Reducer for constructing new state based off of the previous state and an action. 
 * @param {Object} state - the previous state 
 * @param {Object} action - an action containing instructions to produce a new state
 * @returns {Object} - the new state
 */
export function reducer(state, action) {
    switch (action.type) {

        case 'PAGE_BACKWARDS':
            // Paging backwards will never trigger additional data fetching, nor will it result in 
            // the furthestPage changing, so the only thing we need to do here is to move currentPage
            // backwards (or not, if it's already at 1).
            return {
                ...state,
                currentPage: getPrevPage(state.currentPage)
            };

        case 'PAGE_FORWARDS':
            // increment currentPage value from last state
                // don't go over some arbitrary max value 
            // derive window from the new page, if window exceeds length of cardData,
            // add 20 undefined slots to cardData
            {
                const nextPage = getNextPage(state.currentPage);
                return {
                    ...state,
                    currentPage: nextPage,
                    furthestPage: Math.max(state.furthestPage, nextPage)
                };
            }

        case 'PAGE_FORWARDS_WITH_NEW_DATA':
            // increment currentPage value from last state
            // increment furthestPage value
            // merge the new data into previous cardData
            {
                const nextPage = getNextPage(state.currentPage);
                return {
                    ...state,
                    currentPage: nextPage,
                    furthestPage: Math.max(state.furthestPage, nextPage),
                    cardData: [ ...state.cardData, ...action.payload.cardData ]
                };
            }

        default:
            return state;
    }
}
