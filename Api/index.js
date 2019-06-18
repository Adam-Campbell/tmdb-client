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
