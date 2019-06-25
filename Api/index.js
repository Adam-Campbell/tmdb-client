import axios from 'axios';
import API_KEY from '../apiKey';

// axios.defaults.params = {
//     api_key: API_KEY
// };

// axios.defaults.params = {};
// axios.defaults.params['api_key'] = API_KEY;

const a = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

const get = (url, params = {}) => a.get(url, {
    params: {
        api_key: API_KEY,
        ...params
    }
});

// Movies endpoints
export const getPopularMovies = async () => {
    const response = await get('movie/popular');
    return response.data.results;
}

export const getTopRatedMovies = async () => {
    const response = await get('movie/top_rated');
    return response.data.results;
}

export const getUpcomingMovies = async () => {
    const response = await get('movie/upcoming', { region: 'GB' });
    return response.data.results;
}

export const getNowPlayingMovies = async () => {
    const response = await get('movie/now_playing');
    return response.data.results;
};



// TV endpoints
export const getPopularTV = async () => {
    const response = await get('tv/popular');
    return response.data.results;
};

export const getTopRatedTV = async () => {
    const response = await get('tv/top_rated');
    return response.data.results;
};

export const getOnAirTV = async () => {
    const response = await get('tv/on_the_air');
    return response.data.results;
};

export const getAiringTodayTV = async () => {
    const response = await get('tv/airing_today');
    return response.data.results;
};

// People endpoints
export const getPopularPeople = async () => {
    const response = await get('person/popular');
    return response.data.results;
};


// Search endpoints

export const getTrendingSearches = async () => {
    const response = await get('trending/all/day');
    return response.data.results.slice(0, 10).map(result => ({
        id: result.id,
        text: result.title || result.name
    }));
};

export const getSearchResults = async (searchQuery) => {
    const response = await get('search/multi', {
        query: searchQuery
    });
    return response.data.results;
};

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
        with_genres,
        sort_by: sort_by.replace(/release_date/g, releaseDateString)
    };

    const response = await get(discoverUrl, paramsObject);
    return response.data.results;
}

export const getMovieDetails = async (movieId) => {
    const response = await get(`movie/${movieId}`, {
        append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords'
    });
    return response.data;
}

export const getShowDetails = async (showId) => {
    const response = await get(`tv/${showId}`, {
        append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords'
    });
    return response.data;
}

export const getPersonDetails = async (personId) => {
    const response = await get(`person/${personId}`, {
        append_to_response: 'combined_credits,images'
    });
    return response.data;
}

