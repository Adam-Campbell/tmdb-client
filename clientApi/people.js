import { get } from '../axiosClient';

export const getPopularPeople = async (page = 1) => {
    const response = await get('api/people/popular', { page });
    return response.data;
}
