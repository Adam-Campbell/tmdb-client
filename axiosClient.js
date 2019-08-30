import axios from 'axios';

export const a = axios.create({
    baseURL: 'http://localhost:3000/',
    //baseURL: 'http://192.168.1.67:3000/',
    withCredentials: true
});
