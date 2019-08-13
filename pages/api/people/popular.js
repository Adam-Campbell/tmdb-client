import { get } from '../../../axiosServer';

export default async function handler(req, res) {

    const page = req.query.page || 1;

    try {
        const response = await get('person/popular', { page });
        res.status(200).json(response.data.results);
    } catch (error) {
        console.log(error);
    }
}
