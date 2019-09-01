export const dataTypes = {
    pageLink: 'PAGE_LINK',
    ellipses: 'ELLIPSES'
};

export function createHead() {
    return [
        { type: dataTypes.pageLink, pageNumber: 1 },
        { type: dataTypes.ellipses }
    ];
}

export function createTail(pageNumber) {
    return [
        { type: dataTypes.ellipses },
        { type: dataTypes.pageLink, pageNumber }
    ];
}

export function createPageSubArray(startPage, endPage) {
    return Array.from({ length: endPage - startPage + 1 })
        .map((el, idx) => ({
            type: dataTypes.pageLink,
            pageNumber: idx + startPage
        }));
}

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

export function createDataArray(currentPage, totalPages, windowSize) {
    if (windowSize >= totalPages) {
        return createPageSubArray(1, totalPages);
    }
    const { start, end } = getStartAndEndForWindow(currentPage, windowSize);
    if (start <= 1) {
        return [
            ...createPageSubArray(1, windowSize),
            ...createTail(totalPages)
        ];
    } else if (end >= totalPages) {
        return [
            ...createHead(),
            ...createPageSubArray(totalPages - windowSize + 1, totalPages)
        ];
    } else {
        return [
            ...createHead(),
            ...createPageSubArray(start, end),
            ...createTail(totalPages)
        ];
    }
}