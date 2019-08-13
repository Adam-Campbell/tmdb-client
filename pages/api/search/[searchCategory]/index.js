import { get } from '../../../../axiosServer';


export default async function handler(req, res) {
    const { searchCategory, query } = req.query;
    try {
        const response = await get(`search/${searchCategory}`, { query });
        res.json(response.data.results);
    } catch (error) {
        console.log(error);
    }
}