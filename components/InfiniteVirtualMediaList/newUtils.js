export function deriveWindowFromPage(p) {
    return [
        (p-1) * 10,
        (p+1) * 10
    ];
}

export function deriveApiPageFromPage(p) {
    return Math.floor(p / 2) + 1;
}

function addEmptySlots(arr) {
    return [
        ...arr,
        ...Array.from({ length: 20 })
    ];
}

function getNextPage(page) {
    return Math.min(page + 1, 8);
}

function getPrevPage(page) {
    return Math.max(page - 1, 1);
}

function addCardDataAtPage(prevCardData, newCardData, apiPage) {
    // Based off of the apiPage value, calculate the lower and upper bounds for that apiPage in 
    // the cardData array.
    // Then, create a new array consisting off all elements in old cardData before lower bound, plus the
    // new cardData, plus all elementa in old cardData after lower bound.
    const lowerBound = (apiPage - 1) * 20;
    const upperBound = apiPage * 20;
    return [
        ...prevCardData.slice(0, lowerBound),
        ...newCardData,
        ...prevCardData.slice(upperBound)
    ];
}

/**
 * If the window derived from the next page will not extend beyond the current card data, just return
 * the same card data again. If it will extend beyond it however, return the current card data with
 * 20 'empty' (undefined) slots appended to the end, in preparation for the card data which is being
 * fetched asynchronously. 
 * @param {*} nextPage 
 * @param {*} cardData 
 */
function getNextCardData(nextPage, cardData) {
    const upperBoundOfNextPage = deriveWindowFromPage(nextPage)[1];
    return upperBoundOfNextPage <= cardData.length
        ? cardData
        : [ ...cardData, ...Array.from({ length: 20 }) ];
}

/*
State: 
{
    cardData: array of card data, initial value is initial 20 cards.
    currentPage: the current window page being rendered, initial value of 1.
    furthestPage: the furthest (max) window page that has been rendered, initial value of 1.
}
*/

export function reducer(state, action) {
    switch (action.type) {

        // action type cases go here...
        case 'PAGE_FORWARDS':
            // increment currentPage value from last state
                // don't go over some arbitrary max value 
            // derive window from the new page, if window exceeds length of cardData,
            // add 20 undefined slots to cardData
            const nextPage = getNextPage(state.currentPage);
            return {
                ...state,
                currentPage: nextPage,
                furthestPage: Math.max(state.furthestPage, nextPage),
                cardData: getNextCardData(nextPage, state.cardData)
            }

        case 'PAGE_BACKWARDS':
            // Paging backwards will never trigger additional data fetching, nor will it result in 
            // the furthestPage changing, so the only thing we need to do here is to move currentPage
            // backwards (or not, if it's already at 1).
            return {
                ...state,
                currentPage: getPrevPage(state.currentPage)
            }

        case 'STORE_CARD_DATA':
            // We need some information from the action for this one. The actions payload will contain 
            // cardData, which is the new cardData to be added into the array, and it will also include
            // page, which is the Api page that was fetched. 
            return {
                ...state,
                cardData: addCardDataAtPage(
                    state.cardData, 
                    action.payload.cardData, 
                    action.payload.page
                )
            };

        default:
            return state;
    }
}

/*
    Dependencies:
    currentWindow    --  from state
    furthestWindow    -- from state
    cardData          -- from state
    page              -- from state
    getDataFn         -- data fetching fn from component
    dispatch          -- from useReducer

*/

export async function handlePageForward(state, dispatch, getDataFn) {
    const { cardData, currentPage, furthestPage } = state;
    if (currentPage > 8) return;
    dispatch({ type: 'PAGE_FORWARDS' });
    const nextPage = currentPage + 1;
    const nextPageUpperBound = deriveWindowFromPage(nextPage)[1];
    if (nextPageUpperBound > cardData.length && nextPage < 9) {
        // fetch the data
        console.log('made it into coditional');
        console.log(nextPage);
        const nextCardData = await getDataFn(nextPage);
        dispatch({
            type: 'STORE_CARD_DATA',
            payload: {
                cardData: nextCardData,
                page: deriveApiPageFromPage(nextPage)
            }
        });
    }
}