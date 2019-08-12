import axios from 'axios';

export const a = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true
});
