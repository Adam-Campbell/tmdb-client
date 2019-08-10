import {
    deriveWindowFromPage,
    deriveApiPageFromPage,
    getPaddingNum,
    setPx,
    reducer
} from './utils';

describe('deriveWindowFromPage', () => {
    test('it should correctly derive the window tuple based on the input', () => {
        expect(deriveWindowFromPage(1)).toEqual([ 0, 20 ]);
        expect(deriveWindowFromPage(2)).toEqual([ 10, 30 ]);
    });

    test('it should normalize any inputs < 1 to 1, and return the appropriate tuple', () => {
        expect(deriveWindowFromPage(0)).toEqual([ 0, 20 ]);
    });
});

describe('deriveApiPageFromPage', () => {
    test(`it should return the correct Api page number corresponding to the 
    local page number given as input`, () => {
        expect(deriveApiPageFromPage(1)).toBe(1);
        expect(deriveApiPageFromPage(2)).toBe(2);
        expect(deriveApiPageFromPage(3)).toBe(2);
        expect(deriveApiPageFromPage(4)).toBe(3);
    });
    test('it should normalize any inputs < 1 to 1, and return the appropriate Api page number', () => {
        expect(deriveApiPageFromPage(0)).toBe(1);
    });
});

describe('getPaddingNum', () => {
    test('it correctly extract the numeric value from a px string input', () => {
        expect(getPaddingNum('18px')).toBe(18);
    });
    test('if the input is falsey it simply returns 0', () => {
        expect(getPaddingNum(undefined)).toBe(0);
        expect(getPaddingNum('')).toBe(0);
    });
});

describe('setPx', () => {
    test('it correctly converts a number into a px string', () => {
        expect(setPx(220)).toBe('220px');
        expect(setPx(17)).toBe('17px');
    });
    test('it normalizes inputs < 0 to 0 and returns the appropriate string', () => {
        expect(setPx(-53)).toBe('0px');
    });
});

describe('reducer', () => {


    const mockCardData = Array.from({ length: 40 })
            .map((el, idx) => ({
                cardId: idx
            }));

    test('it returns the current state', () => {
        const state = {
            currentPage: 1,
            furthestPage: 1,
            cardData: mockCardData
        };
        expect(reducer(state, {})).toEqual(state);
    });

    test('it handles PAGE_BACKWARDS', () => {

        expect(reducer({
            currentPage: 2,
            furthestPage: 2,
            cardData: mockCardData
        }, { type: 'PAGE_BACKWARDS' }))
        .toEqual({
            currentPage: 1,
            furthestPage: 2,
            cardData: mockCardData
        });
    });

    test('it handles PAGE_FORWARDS', () => {

        expect(reducer({
            currentPage: 1,
            furthestPage: 2,
            cardData: mockCardData
        }, { type: 'PAGE_FORWARDS' }))
        .toEqual({
            currentPage: 2,
            furthestPage: 2,
            cardData: mockCardData
        });

        // test that furthestPage will increment when appropriate
        expect(reducer({
            currentPage: 2,
            furthestPage: 2,
            cardData: mockCardData
        }, { type: 'PAGE_FORWARDS' }))
        .toEqual({
            currentPage: 3,
            furthestPage: 3,
            cardData: mockCardData
        });
    });

    test('it handles PAGE_FORWARDS_WITH_NEW_DATA', () => {

        const newCardData = Array.from({ length: 20 })
            .map((el,idx) => ({
                cardId: idx + 40
            }));

        expect(reducer({
            currentPage: 3,
            furthestPage: 3,
            cardData: mockCardData
        }, {
            type: 'PAGE_FORWARDS_WITH_NEW_DATA',
            payload: { 
                cardData: newCardData 
            }
        }))
        .toEqual({
            currentPage: 4,
            furthestPage: 4,
            cardData: [
                ...mockCardData,
                ...newCardData
            ]
        });
    });
});
