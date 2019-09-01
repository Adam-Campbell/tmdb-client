export const dataTypes = {
    pageLink: 'PAGE_LINK',
    ellipses: 'ELLIPSES'
};

/**
 * Creates the head to be appended to the final array if the current window is not at the
 * start of the total range of pages.
 * @returns {Array} - the head of the array, consisting of the data for page 1 and an ellipses
 * separator.
 */
export function createHead() {
    return [
        { type: dataTypes.pageLink, pageNumber: 1 },
        { type: dataTypes.ellipses }
    ];
}

/**
 * Creates the tail to be appended to the arrya, if the current window is not at the end of the 
 * total range of pages. 
 * @param {Number} pageNumber - the page number for the last page in the total range.
 * @returns {Array} - the tail of the array, consisting of an ellipses separator and the data for
 * the final page. 
 */
export function createTail(pageNumber) {
    return [
        { type: dataTypes.ellipses },
        { type: dataTypes.pageLink, pageNumber }
    ];
}

/**
 * Creates an array of page data, based on the startPage and endPage supplied to it. 
 * @param {Number} startPage - the page number to start at. 
 * @param {Number} endPage - the page number to finish at (inclusive).
 * @returns {Array} - the constructed array of page data.
 */
export function createPageLinksSubArray(startPage, endPage) {
    return Array.from({ length: endPage - startPage + 1 })
        .map((el, idx) => ({
            type: dataTypes.pageLink,
            pageNumber: idx + startPage
        }));
}

/**
 * Calculates the start and end pages for the current window, based on the supplied current page and
 * window size
 * @param {Number} currentPage - the current page number 
 * @param {Number} windowSize  - the desired window size
 * @returns {Object} - An object with start and end properties denoting the start and end points of
 * the window. 
 */
export function getStartAndEndForWindow(currentPage, windowSize) {
    if (windowSize % 2 === 0) {
        return {
            start: currentPage - (windowSize / 2 - 1),
            end: currentPage + (windowSize / 2)
        };
    } else {
        return {
            start: currentPage - Math.floor(windowSize / 2),
            end: currentPage + Math.floor(windowSize / 2)
        };
    }
}

/**
 * Used to construct an array of data from which the pagination links can be rendered. As long as 
 * totalPages is greater than windowSize there will always be at least `windowSize` number of links,
 * with an optional head link and/or tail link depending on the windows position within the total range
 * of available pages.
 * @param {Number} currentPage - the current page number 
 * @param {Number} totalPages - the total number of pages available
 * @param {Number} windowSize - the desired window size
 * @returns {Array} - the constructed array of page data to be used for rendering the pagination links.
 */
export function createPageLinksDataArray(currentPage, totalPages, windowSize) {
    if (windowSize >= totalPages) {
        return createPageLinksSubArray(1, totalPages);
    }
    const { start, end } = getStartAndEndForWindow(currentPage, windowSize);
    if (start <= 1) {
        return [
            ...createPageLinksSubArray(1, windowSize),
            ...createTail(totalPages)
        ];
    } else if (end >= totalPages) {
        return [
            ...createHead(),
            ...createPageLinksSubArray(totalPages - windowSize + 1, totalPages)
        ];
    } else {
        return [
            ...createHead(),
            ...createPageLinksSubArray(start, end),
            ...createTail(totalPages)
        ];
    }
}