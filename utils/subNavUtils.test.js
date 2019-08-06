import { 
    getMovieSubNavData, 
    getShowSubNavData, 
    getPersonSubNavData,
    getSearchSubNavData 
} from './subNavUtils';

describe('getMovieSubNavData', () => {
    test('it matches snapshot', () => {
        expect(getMovieSubNavData('123')).toMatchSnapshot();
    });
});

describe('getShowSubNavData', () => {
    test('it matches snapshot', () => {
        expect(getShowSubNavData('123')).toMatchSnapshot();
    });
});

describe('getPersonSubNavData', () => {
    test('it matches snapshot', () => {
        expect(getPersonSubNavData('foo')).toMatchSnapshot();
    });
});

describe('getSearchSubNavData', () => {
    test('it matches snapshot', () => {
        expect(getSearchSubNavData('bar')).toMatchSnapshot();
    });
});


