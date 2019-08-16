import axios from 'axios';
import api_key from './apiKey';

export const a = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export const get = (url, params = {}) => a.get(url, {
    params: {
        api_key,
        ...params
    }
});