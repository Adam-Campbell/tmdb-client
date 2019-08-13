import { get } from '../../../axiosServer';

export default async (req, res) => {

    const page = req.query.page || 1;
    const { region } = req.query;

    try {
        const response = await get('movie/upcoming', { page, region });
        res.status(200).json(response.data.results);
    } catch (error) {
        console.log(error);
    }

}