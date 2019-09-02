import axios from 'axios';

export const a = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export const get = (url, params = {}) => a.get(url, {
    params: {
        api_key: process.env.API_KEY,
        ...params
    }
});