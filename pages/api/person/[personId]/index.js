import { get } from '../../../../axiosServer';

export default async function handler(req, res) {
    const { personId } = req.query;
    try {
        const response = await get(`person/${personId}`, {
            append_to_response: 'combined_credits,images,external_ids'
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}