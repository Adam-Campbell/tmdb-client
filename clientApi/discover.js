import { get } from '../axiosClient';

export async function getDiscoverResults(options) {
    try {
        const response = await get('api/discover', options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
 