/*

Create an array of data to render from where each element is an object with a type attribute and possibly
a number attribute. The type will be either 'LINK' or 'ELLIPSES'. If the type is 'LINK' then it must have 
a number attribute as well. 

*/

export const dataTypes = {
    pageLink: 'PAGE_LINK',
    ellipses: 'ELLIPSES'
};

function createHead() {
    return [
        { type: dataTypes.pageLink, pageNumber: 1 },
        { type: dataTypes.ellipses }
    ];
}

function createTail(pageNumber) {
    return [
        { type: dataTypes.ellipses },
        { type: dataTypes.pageLink, pageNumber }
    ];
}

function createPageSubArray(startPage, endPage) {
    return Array.from({ length: endPage - startPage + 1 })
        .map((el, idx) => ({
            type: dataTypes.pageLink,
            pageNumber: idx + startPage
        }));
}

function getStartAndEndForNonTerminalSubArray(currentPage, windowSize) {
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

export function createDataArray(currentPage, totalPages, windowSize) {
    if (currentPage <= windowSize) {
        return [
            ...createPageSubArray(1, windowSize),
            ...createTail(totalPages)
        ];
    } else if (currentPage > totalPages - windowSize) {
        return [
            ...createHead(),
            ...createPageSubArray(totalPages - windowSize + 1, totalPages)
        ];
    } else {
        const { start, end } = getStartAndEndForNonTerminalSubArray(currentPage, windowSize);
        return [
            ...createHead(),
            ...createPageSubArray(start, end),
            ...createTail(totalPages)
        ]
    }
}