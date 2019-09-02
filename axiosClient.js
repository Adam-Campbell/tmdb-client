import axios from 'axios';

export const a = axios.create({
    baseURL: process.env.ROOT_URL,
    withCredentials: true
});

export function get(url, params = {}) { 
    return a.get(url, {
        params: {
            ...params
        }
    });
}