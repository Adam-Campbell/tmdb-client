import {
    filterForRoleType,
    filterForMediaType,
    getYear,
    getMilliseconds, 
    transformCredit,
    transformAndGroupReducer,
    transformCreditsData
} from './creditsDataProcessing';

// For the first two function I need a cast credit for each of movie and tv, and a crew credit
// for each of movie and tv.

const castMovieCredit = {
    id: 561,
    original_language: 'en',
    original_title: 'Constantine',
    overview: 'John Constantine has literally been to Hell and back...',
    vote_count: 3363,
    video: false,
    media_type: 'movie',
    credit_id: '52fe4252c3a36847f8015399',
    release_date: '2005-02-18',
    vote_average: 6.8,
    popularity: 15.639,
    title: 'Constantine',
    character: 'John Constantine',
    adult: false, 
    backdrop_path: '/y6UDPkSAcO08O9dmijgZ7tYw4HK.jpg',
    poster_path: '/9Q6bzCQ19sJkQ9IIfT3ybf24aFL.jpg'
};

const castTVCredit = {
    id: 35006,
    original_language: 'en',
    original_name: "Bill & Ted's Excellent Adventures",
    overview: "Bill & Ted's Excellent Adventures is a 1990 spin-off...",
    vote_count: 8,
    media_type: 'tv',
    credit_id: '5258dc30760ee3466175a784',
    first_air_date: '1990-09-15',
    vote_average: 6.3,
    popularity: 1.951,
    name: "Bill & Ted's Excellent Adventures",
    character: 'Ted Logan (Voice)',
    backdrop_path: '/1Qs68UlSv135kwKjZmaZtp4tkBT.jpg',
    poster_path: '/oyUnZMl5IVqszjWrKuVmkBrnLtH.jpg'
};

const crewMovieCredit = {
    id: 245891,
    department: 'Production',
    original_language: 'en',
    original_title: 'John Wick',
    job: 'Executive Producer',
    overview: 'Ex-hitman John Wick comes out of retirement to track down...',
    video: false,
    media_type: 'movie',
    credit_id: '54b658a9c3a368377e00138a',
    poster_path: '/b9uYMMbm87IBFOq59pppvkkkgNg.jpg',
    popularity: 54.142,
    backdrop_path: '/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg',
    vote_average: 7.2,
    vote_count: 10504,
    adult: false, 
    title: 'John Wick',
    release_date: '2014-10-24'
};

const crewTVCredit = {
    backdrop_path: null,
    credit_id: '5c22c4e99251414c16c3660d',
    department: 'Production',
    episode_count: 1,
    first_air_date: '2019-12-31',
    id: 72710,
    job: 'Executive Producer',
    media_type: 'tv',
    name: 'The Continental',
    original_language: 'en',
    original_name: 'The Continental',
    overview: 'As a spin-off of the hit film trilogy John Wick...',
    popularity: 0.6,
    poster_path: '/tcJssZuwSRSbUqvEGF0veiwh40H.jpg',
    vote_average: 0,
    vote_count: 0,
};

const combinedCredits = {
    cast: [ castMovieCredit, castTVCredit ],
    crew: [ crewMovieCredit, crewTVCredit ]
};

// This needs a combinedCredits data structure containing both cast credits and crew credits

describe('filterForRoleType', () => {

    

    test('it filters credits down to just cast credits when a role type of cast is specified', () => {
        expect(filterForRoleType('cast', combinedCredits)).toEqual([
            castMovieCredit,
            castTVCredit
        ]);
    });

    test('it filters credits down to just crew credits when a role type of crew is specified', () => {
        expect(filterForRoleType('crew', combinedCredits)).toEqual([
            crewMovieCredit,
            crewTVCredit
        ]);
    });

    test('it returns all credits as one array when a role type of both is specified', () => {
        expect(filterForRoleType('both', combinedCredits)).toEqual([
            castMovieCredit,
            castTVCredit,
            crewMovieCredit, 
            crewTVCredit
        ]);
    });
});


// This needs a combined credits data structure containing both movie credits and tv credits. 

describe('filterForMediaType', () => {

    const combinedCreditsArr = [
        castMovieCredit,
        castTVCredit,
        crewMovieCredit, 
        crewTVCredit
    ];

    test('it filters down to just movie credits when a mediaType of movie is specified', () => {
        expect(filterForMediaType('movie', combinedCreditsArr)).toEqual([
            castMovieCredit,
            crewMovieCredit
        ]);
    });

    test('it filters down to just tv credits when a mediaType of tv is specified', () => {
        expect(filterForMediaType('tv', combinedCreditsArr)).toEqual([
            castTVCredit,
            crewTVCredit
        ]);
    });

    test('it returns all credits given when a mediaType of both is specified', () => {
        expect(filterForMediaType('both', combinedCreditsArr)).toEqual(combinedCreditsArr);
    });
});

describe('getYear', () => {
    test('it returns null if a falsey argument is provided', () => {
        expect(getYear('')).toBe(null);
    });

    test('if a dateString is provided, it returns the year corresponding to that dateString', () => {
        expect(getYear('2005-02-18')).toBe(2005);
    });
});

describe('getMilliseconds', () => {
    test('it returns null if a falsey argument is provided', () => {
        expect(getMilliseconds('')).toBe(null);
    });

    test('if a dateString is provided, it returns the milliseconds separating that date from epoch', () => {
        expect(getMilliseconds('2005-02-18')).toBe(1108684800000);
    })
});

describe('transformCredit', () => {

    test('transforms an acting credit into the correct format', () => {

        expect(transformCredit(castMovieCredit)).toEqual({
            mediaId: 561,
            creditId: '52fe4252c3a36847f8015399',
            mediaType: 'movie',
            releaseYear: 2005,
            fullReleaseDate: '2005-02-18',
            name: 'Constantine',
            creditDescription: 'as John Constantine' 
        });
    });

    test('transforms a production credit into the correct format', () => {

        expect(transformCredit(crewMovieCredit)).toEqual({
            mediaId: 245891,
            creditId: '54b658a9c3a368377e00138a',
            mediaType: 'movie',
            releaseYear: 2014,
            fullReleaseDate: '2014-10-24',
            name: 'John Wick',
            creditDescription: 'Executive Producer' 
        });
    });
});

// To test this I need an accumulator with one year already present on it, then I need an unprocessed
// credit object for that year, and additionally I need an unprocessed credit object for a different year.
describe('transformAndGroupReducer', () => {

    const acc1 = {
        2005: {
            releaseYear: 2005,
            credits: []
        }
    }

    test(`it transforms a credit and adds it under the correct key on the accumulator if the key exists, 
    then returns the accumulator`, () => {
        expect(transformAndGroupReducer(acc1, castMovieCredit)).toEqual({
            2005: {
                releaseYear: 2005,
                credits: [ transformCredit(castMovieCredit) ]
            }
        });
    });

    const acc2 = {
        2003: {
            releaseYear: 2003,
            credits: []
        }
    };

    test(`it transforms a credit and then creates the correct key on the accumulator if it doesn't exist
    already, and then returns the accumulator`, () => {
        expect(transformAndGroupReducer(acc2, crewMovieCredit)).toEqual({
            2003: {
                releaseYear: 2003,
                credits: []
            },
            2014: {
                releaseYear: 2014,
                credits: [ transformCredit(crewMovieCredit) ]
            }
        });
    });
});

// To test this I just need an unprocessed combinedCredits object, and I can then assert on the structure it 
// should have after being processed.
describe('transformCreditsData', () => {
    test('it correctly takes the unprocessed credits data and transforms it into the format required', () => {
        expect(transformCreditsData(combinedCredits, 'both', 'both')).toEqual([
            {
                releaseYear: 2019,
                credits: [ transformCredit(crewTVCredit) ]
            },
            {
                releaseYear: 2014,
                credits: [ transformCredit(crewMovieCredit) ]
            },
            {
                releaseYear: 2005,
                credits: [ transformCredit(castMovieCredit) ]
            },
            {
                releaseYear: 1990,
                credits: [ transformCredit(castTVCredit) ]
            },
        ]);
    });
});