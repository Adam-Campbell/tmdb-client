import {
    getImageData,
    getPageTitle,
    getMediaImages,
    getMediaActors,
    getMediaDirectors,
    splitNameApart,
    getPersonImage,
    getListImages
} from './utils';
import { getImageUrl, imageSizeConstants } from '../../utils';

describe('getImageData', () => {
    test('it returns false if the imagePath argument is falsey', () => {
        expect(getImageData(
            '',
            'Game of Thrones',
            500
        )).toBe(false);
    });
    test(`if imagePath is not falsey, it returns a data object with url, alt and width properties
    according to the arguments provided`, () => {
        const expectedUrl = getImageUrl('/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', imageSizeConstants.w780);
        expect(getImageData(
            '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
            'Game of Thrones',
            780
        )).toEqual({
            url: expectedUrl,
            width: 780,
            alt: 'Game of Thrones'
        });
    });
    test('if width is not specified, it defaults to 500', () => {
        const expectedUrl = getImageUrl('/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', imageSizeConstants.w500);
        expect(getImageData(
            '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
            'Game of Thrones'
        )).toEqual({
            url: expectedUrl,
            width: 500,
            alt: 'Game of Thrones'
        });
    });
});

describe('getPageTitle', () => {
    test('if no uniqueTitleSegment is provided, it simply returns the baseTitle', () => {
        expect(getPageTitle('Game of Thrones')).toBe('Game of Thrones');
    });
    test(`if a uniqueTitleSegmenet is provided, it combines the baseTitle with the uniqueTitleSegment
    and returns the result`, () => {
        expect(getPageTitle(
            'Game of Thrones',
            'Similar TV Shows'
        )).toBe('Game of Thrones - Similar TV Shows');
    });
});

describe('getMediaImages', () => {

    const expectedPosterUrl = getImageUrl('/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', imageSizeConstants.w500);
    const expectedBackdropUrl = getImageUrl('/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg', imageSizeConstants.w780);

    test(`it transforms posterPath and backdropPath into image data objects and returns an array containing
    these objects`, () => {
        expect(getMediaImages(
            '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
            '/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg',
            'Game of Thrones'
        )).toEqual([
            {
                url: expectedPosterUrl,
                width: 500,
                alt: 'A poster for Game of Thrones'
            },
            {
                url: expectedBackdropUrl,
                width: 780,
                alt: 'A promotional still for Game of Thrones'
            }
        ]);
    });
    test(`if either, or both of posterPath and backdropPath are falsey then no image data object is created
    for that path`, () => {
        expect(getMediaImages('', '', 'Game of Thrones')).toEqual([]);
        expect(getMediaImages(
            '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
            '',
            'Game of Thrones'
        )).toEqual([
            {
                url: expectedPosterUrl,
                width: 500,
                alt: 'A poster for Game of Thrones'
            }
        ]);
        expect(getMediaImages(
            '',
            '/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg',
            'Game of Thrones'
        )).toEqual([
            {
                url: expectedBackdropUrl,
                width: 780,
                alt: 'A promotional still for Game of Thrones'
            }
        ]);
    });
});

describe('getMediaActors', () => {

    const actorsArray = [
        {
            character: 'Daenerys Targaryen',
            id: 1223786
        },
        {
            character: 'Jon Snow',
            id: 239019
        },
        {
            character: 'Tyrion Lannister',
            id: 22970,
        },
        {
            character: 'Cersei Lannister',
            id: 17286,
        },
        {
            character: 'Jaime Lannister',
            id: 12795
        }  
    ];

    const expectedResult = [
        {
            profile: 'http://localhost:3000/person/1223786',
            role: 'Daenerys Targaryen'
        },
        {
            profile: 'http://localhost:3000/person/239019',
            role: 'Jon Snow'
        },
        {
            profile: 'http://localhost:3000/person/22970',
            role: 'Tyrion Lannister'
        },
        {
            profile: 'http://localhost:3000/person/17286',
            role: 'Cersei Lannister'
        }
    ];

    test(`it takes an array of actor objects and returns a new array with transformed actor objects that
    only contain the information needed for open graph`, () => {
        expect(getMediaActors(actorsArray)).toEqual(expectedResult);
    });
    test(`if the array of actor objects has more than four items in it, everything after the first four 
    items is ignored`, () => {
        expect(getMediaActors(actorsArray)).toEqual(expectedResult);
    });
});

describe('getMediaDirectors', () => {

    const createdByArray = [
        { id: 9813 },
        { id:  228068 }
    ];

    const crewArray = [
        { id: 40644, job: 'Director' }
    ];

    const expectedShowResult = [
        'http://localhost:3000/person/9813',
        'http://localhost:3000/person/228068'
    ];

    const expectedMovieResult = [
        'http://localhost:3000/person/40644'
    ];

    test('returns an array of URLs for the profiles of the directors provided', () => {
        expect(getMediaDirectors(false, crewArray, createdByArray)).toEqual(expectedShowResult);
    });
    test(`if isMovie is true, the directors are derived from crewArray by filtering for crew with the
    title of Director`, () => {
        expect(getMediaDirectors(true, crewArray, undefined)).toEqual(expectedMovieResult);
    });
    test('if isMovie is false, the directors are found in createdByArray', () => {
        expect(getMediaDirectors(false, crewArray, createdByArray)).toEqual(expectedShowResult);
    });
});

describe('splitNameApart', () => {
    test(`it correctly separates the given full name into first and last names, and returns an object
    containing the separated first and last names`, () => {
        expect(splitNameApart('Kit Harrington')).toEqual({
            firstName: 'Kit',
            lastName: 'Harrington'
        });
    });
    test('if only one name is provided, it is assumed to be the first name and returned as such', () => {
        expect(splitNameApart('Sinbad')).toEqual({
            firstName: 'Sinbad'
        });
    });
    test(`if more than two space separated names are present, only the first is considered to be the
    first name, all subsequent names are considered to be the last name`, () => {
        expect(splitNameApart('Jennifer Love Hewitt')).toEqual({
            firstName: 'Jennifer',
            lastName: 'Love Hewitt'
        });
    });
    test(`if there is any whitespace at the start or end of the string given, the whitespace is removed before 
    splitting the name apart`, () => {
        expect(splitNameApart(' Kit Harrington ')).toEqual({
            firstName: 'Kit',
            lastName: 'Harrington'
        });
    });
});

describe('getPersonImage', () => {
    test('if the profilePath provided is falsey it returns an empty array', () => {
        expect(getPersonImage('', 'KitHarrington')).toEqual([]);
    });
    test(`it takes the profilePath and name arguments provided and constructs an image data object which
    it returns in an array`, () => {
        const expectedImageUrl = getImageUrl('/4MqUjb1SYrzHmFSyGiXnlZWLvBs.jpg', imageSizeConstants.w500);
        expect(getPersonImage('/4MqUjb1SYrzHmFSyGiXnlZWLvBs.jpg', 'Kit Harrington')).toEqual([
            {
                url: expectedImageUrl,
                width: 500,
                alt: 'Kit Harrington'
            }
        ]);
    }); 
});

describe('getListImages', () => {
    const itemsArray = [
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            backdrop_path: '/pIUvQ9Ed35wlWhY2oU6OmwEsmzG.jpg'
        },
        {
            name: 'Game of Thrones',
            backdrop_path: '/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg'
        },
        {
            title: 'The Lord of the Rings: The Return of the King',
            backdrop_path: '/8BPZO0Bf8TeAy8znF43z8soK3ys.jpg'
        }
    ];
    const expectedResult = [
        {
            url: getImageUrl('/pIUvQ9Ed35wlWhY2oU6OmwEsmzG.jpg', imageSizeConstants.w780),
            width: 780,
            alt: 'The Lord of the Rings: The Fellowship of the Ring'
        },
        {
            url: getImageUrl('/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg', imageSizeConstants.w780),
            width: 780,
            alt: 'Game of Thrones'
        }
    ];
    test('if the itemsArray argument is an empty array, the function returns an empty array', () => {
        expect(getListImages([])).toEqual([]);
    });
    test(`if itemsArray contains elements, then the elements are transformed into image data objects
    and returned in a new array`, () => {
        expect(getListImages(itemsArray)).toEqual(expectedResult);
    });
    test(`if itemsArray contains more than two elements, everything after the first two is ignored`, () => {
        expect(getListImages(itemsArray)).toEqual(expectedResult);
    });
});
