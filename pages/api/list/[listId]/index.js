import { get } from '../../../../axiosServer';

export default async function handler(req, res) {
    const { listId } = req.query;
    try {
        const response = await get(`list/${listId}`);
        res.json(response.data); 
    } catch (error) {
        console.log(error);
    }
}