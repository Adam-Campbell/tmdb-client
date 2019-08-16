import axios from 'axios';

export const a = axios.create({
    baseURL: 'http://localhost:3000/'
});

export function get(url, params = {}) { 
    return a.get(url, {
        params: {
            ...params
        }
    });
}
