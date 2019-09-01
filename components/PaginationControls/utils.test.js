import {
    dataTypes,
    createHead, 
    createTail,
    createPageLinksSubArray,
    getStartAndEndForWindow,
    createPageLinksDataArray
} from './utils';

describe('createHead', () => {
    test('it outputs the data for page 1, plus an ellipses separator', () => {
        expect(createHead()).toEqual([
            { type: dataTypes.pageLink, pageNumber: 1 },
            { type: dataTypes.ellipses }
        ]);
    });
});

describe('createTail', () => {
    test('it outputs the data for the final page, plus an ellipses separator', () => {
        expect(createTail(10)).toEqual([
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 10 }
        ]);
    });
    test('the pageNumber in the output matches the pageNumber supplied', () => {
        expect(createTail(25)).toEqual([
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 25 }
        ]);
        expect(createTail(50)).toEqual([
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 50 }
        ]);
    });
});

describe('getStartAndEndForWindow', () => {
    test(`the absolute difference between the start and end values produced is one less than the 
    windowSize argument supplied`, () => {
        const { start: startOdd, end: endOdd } = getStartAndEndForWindow(20, 9);
        expect(endOdd - startOdd).toBe(8);
        const { start: startEven, end: endEven } = getStartAndEndForWindow(20, 10);
        expect(endEven - startEven).toBe(9);
    });
    test(`if the windowSize argument is odd, the range produced is evenly distributed
    around the currentPage argument supplied`, () => {
        expect(getStartAndEndForWindow(20, 9)).toEqual({
            start: 16,
            end: 24
        });
    });
    test(`if the windowSize argument is even, the section of the outputted range that sits above
    currentPage has one more element than the section of the range below it`, () => {
        const currentPage = 20;
        const { start, end } = getStartAndEndForWindow(currentPage, 10);
        const rangeBelow = currentPage - start;
        const rangeAbove = end - currentPage;
        expect(rangeAbove > rangeBelow).toBe(true);
        expect(rangeAbove - rangeBelow).toBe(1);
    });
});

describe('createPageLinksSubArray', () => {
    test(`it outputs an array of page data for every page ranging from the specified startPage to
    the specified endPage, inclusive`, () => {
        expect(createPageLinksSubArray(2, 6)).toEqual([
            { type: dataTypes.pageLink, pageNumber: 2 },
            { type: dataTypes.pageLink, pageNumber: 3 },
            { type: dataTypes.pageLink, pageNumber: 4 },
            { type: dataTypes.pageLink, pageNumber: 5 },
            { type: dataTypes.pageLink, pageNumber: 6 },
        ]);
    });
    test(`if the range between the startPage and endPage is 0 or negative (startPage is greater than
    end page), then an empty array is returned`, () => {
        expect(createPageLinksSubArray(5, 4)).toEqual([]);
    });
});

describe('createPageLinksDataArray', () => {
    test(`if the current window falls at the start of the range, it outputs an array containing
    the data for the current window plus a tail`, () => {
        expect(createPageLinksDataArray(3, 50, 5)).toEqual([
            { type: dataTypes.pageLink, pageNumber: 1 },
            { type: dataTypes.pageLink, pageNumber: 2 },
            { type: dataTypes.pageLink, pageNumber: 3 },
            { type: dataTypes.pageLink, pageNumber: 4 },
            { type: dataTypes.pageLink, pageNumber: 5 },
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 50 }
        ]);
    });
    test(`if the current window falls at the end of the range, it outputs an array containing the data
    for the current window plus a head`, () => {
        expect(createPageLinksDataArray(48, 50, 5)).toEqual([
            { type: dataTypes.pageLink, pageNumber: 1 },
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 46 },
            { type: dataTypes.pageLink, pageNumber: 47 },
            { type: dataTypes.pageLink, pageNumber: 48 },
            { type: dataTypes.pageLink, pageNumber: 49 },
            { type: dataTypes.pageLink, pageNumber: 50 }
        ]);
    });
    test(`if the current window falls somewhere in the middle of the range, it outputs an array
    containing the data for the current window plust a head and a tail`, () => {
        expect(createPageLinksDataArray(25, 50, 5)).toEqual([
            { type: dataTypes.pageLink, pageNumber: 1 },
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 23 },
            { type: dataTypes.pageLink, pageNumber: 24 },
            { type: dataTypes.pageLink, pageNumber: 25 },
            { type: dataTypes.pageLink, pageNumber: 26 },
            { type: dataTypes.pageLink, pageNumber: 27 },
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 50 }
        ]);
    });
    test(`the windows are constrained to the total ranges of pages available, so combinations of 
    arguments that would lead to producing a window that goes out of bounds will instead just produce
    the smallest or greatest legal window possible, depending on which bound they would have exceeded`, () => {
        expect(createPageLinksDataArray(1, 50, 5)).toEqual([
            { type: dataTypes.pageLink, pageNumber: 1 },
            { type: dataTypes.pageLink, pageNumber: 2 },
            { type: dataTypes.pageLink, pageNumber: 3 },
            { type: dataTypes.pageLink, pageNumber: 4 },
            { type: dataTypes.pageLink, pageNumber: 5 },
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 50 }
        ]);
        expect(createPageLinksDataArray(50, 50, 5)).toEqual([
            { type: dataTypes.pageLink, pageNumber: 1 },
            { type: dataTypes.ellipses },
            { type: dataTypes.pageLink, pageNumber: 46 },
            { type: dataTypes.pageLink, pageNumber: 47 },
            { type: dataTypes.pageLink, pageNumber: 48 },
            { type: dataTypes.pageLink, pageNumber: 49 },
            { type: dataTypes.pageLink, pageNumber: 50 }
        ]);
    });
});