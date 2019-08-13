import { get } from './helpers';

// const sampleParams = {
//     release_gte: '1900',
//     release_lte: '2019',
//     score_gte: '0',
//     score_lte: '10',
//     sort_by: 'popularity.desc',
//     with_genres: '',
//     media_type: 'movies',
//     ...query
// };

export const getDiscoverResults = async (options) => {
    // First check whether media_type is 'movies' or 'tv' - this will affect the naming used
    // for subsequent params.

    // Is there any benefit to adapting the params at all? If score_gte is 0 and score_lte is 10
    // then we can just omit score altogether. If release_gte and release_lte are the same year then we can
    // just search for a specific year instead of a range. Is there any benefit to this though?

    // One thing I do need to do is turn the release years into actual dates - ${release_gte}-01-01 and
    // ${release_lte}-12-31

    const {
        release_gte,
        release_lte,
        score_gte,
        score_lte,
        sort_by,
        with_genres,
        media_type
    } = options;

    const isMovies = media_type === 'movies';
    const discoverUrl =  isMovies ? 'discover/movie' : 'discover/tv';
    const releaseDateString = isMovies ? 'primary_release_date' : 'first_air_date';

    const paramsObject = {
        [`${releaseDateString}.gte`]: `${release_gte}-01-01`,
        [`${releaseDateString}.lte`]: `${release_lte}-12-31`,
        'vote_average.gte': score_gte,
        'vote_average.lte': score_lte,
        with_genres: with_genres.replace('%2C', ','),
        sort_by: sort_by.replace(/release_date/g, releaseDateString)
    };

    console.log(paramsObject);
    const response = await get(discoverUrl, paramsObject);
    return response.data.results;
}