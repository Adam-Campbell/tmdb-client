import { 
    flow, 
    partial, 
    partialRight, 
    split, 
    ary,
    unary,
    filter,
    some,
    map,
    join,
    isEqual
} from 'lodash';

/*

    flow -- is just pipe
    partial -- partially apply args
    partialRight -- partially apply args from right

*/

export const sortByOptions = [
    { name: 'Popularity Ascending', value: 'popularity.asc' },
    { name: 'Popularity Descending', value: 'popularity.desc' },
    { name: 'Release Date Ascending', value: 'release_date.asc' },
    { name: 'Release Date Descending', value: 'release_date.desc' },
    { name: 'Vote Average Ascending', value: 'vote_average.asc' },
    { name: 'Vote Average Descending', value: 'vote_average.desc' },
];

export const movieGenres = [
    { name: 'Action', id: 28 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'Western', id: 37 }
];

export const TVGenres = [
    { name: 'Action & Adventure', id: 10759 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Kids', id: 10762 },
    { name: 'Mystery', id: 9648 },
    { name: 'News', id: 10763 },
    { name: 'Reality', id: 10764 },
    { name: 'Sci-Fi & Fantasy', id: 10765 },
    { name: 'Soap', id: 10766 },
    { name: 'Talk', id: 10767 },
    { name: 'War & Politics', id: 10768 },
    { name: 'Western', id: 37 }
];

export const mediaTypes = [
    { name: 'TV', value: 'tv' },
    { name: 'Movies', value: 'movies' }
]

const defaultQueryParams = {
    release_gte: '1900',
    release_lte: '2019',
    score_gte: '0',
    score_lte: '10',
    sort_by: 'popularity.desc',
    with_genres: '',
    media_type: 'movies',
};

const splitString = ary(split, 2);

/**
 * Compose an object with some default values, such that properties present in object overide properties
 * present in defaults.
 */
function withDefaults(defaults) {
    return function decorateObject(object) {
        return { 
            ...defaults, 
            ...object 
        };
    }
}

/**
 * Given a genre id and an array of genre objects, returns true if there is a genre object within the array
 * that has an id matching the supplied genre id, else returns false.
 */
function isValidGenreId(genresArray) {
    return function(id) {
        return some(genresArray, genre => genre.id === id);
    }
}


function validateGenresForURL(movieGenresArr, TVGenresArr) {
    return function validate(queryParams) {
        if (queryParams.with_genres === '') return queryParams;

        const genresArr = queryParams.media_type === 'movies' ? movieGenresArr : TVGenresArr;
        const validatedGenres = flow(
            decodeURIComponent,
            partialRight(splitString, ','),
            partialRight(map, unary(parseInt)),
            partialRight(filter, isValidGenreId(genresArr)),
            partialRight(join, ','),
            encodeURIComponent
        )(queryParams.with_genres)
        return {
            ...queryParams,
            with_genres: validatedGenres
        }
    }
}

export function parseQueryParams(queryParams, movieGenresArr, TVGenresArr) {
    return flow(
        withDefaults(defaultQueryParams),
        validateGenresForURL(movieGenresArr, TVGenresArr)
    )(queryParams);
}


function convertGenreIdsToObjects(idsString, genresArr) {
    return idsString === '' ? [] :
            flow(
                decodeURIComponent,
                partialRight(split, ','),
                partialRight(map, unary(parseInt)),
                partialRight(filter, isValidGenreId(genresArr)),
                partialRight(
                    map, 
                    id => genresArr.find(genre => genre.id === id)
                )
            )(idsString)
}

export function convertQueryParamsToProps(queryParams, movieGenresArr, TVGenresArr) {
    return {
        releaseValues: [
            parseInt(queryParams.release_gte),
            parseInt(queryParams.release_lte)
        ],
        scoreValues: [
            parseFloat(queryParams.score_gte),
            parseFloat(queryParams.score_lte)
        ],
        sortBy: queryParams.sort_by,
        mediaType: queryParams.media_type,
        withGenres: convertGenreIdsToObjects(
            queryParams.with_genres,
            queryParams.media_type === 'movies' ? movieGenresArr : TVGenresArr
        )
    }
}

export function convertGenreObjectsToIds(objectsToCheck, genresArr) {
    return flow(
        partialRight(map, obj => obj.id),
        partialRight(filter, isValidGenreId(genresArr)),
        partialRight(join, ',')
    )(objectsToCheck)
}