import { a, get } from '../../../../axiosServer';
import api_key from '../../../../apiKey';

export default async function handler(req, res) {
    const { userSessionId } = req.cookies;
    const { userId } = req.query;
    if (userSessionId) {
        try {
            const [
                createdLists,
                favouriteMovies,
                favouriteShows,
                ratedMovies,
                ratedShows,
                ratedEpisodes,
                movieWatchlist,
                showWatchlist
            ] = await Promise.all([
                get(`account/${userId}/lists`, { session_id: userSessionId }),
                get(`account/${userId}/favorite/movies`, { session_id: userSessionId }),
                get(`account/${userId}/favorite/tv`, { session_id: userSessionId }),
                get(`account/${userId}/rated/movies`, { session_id: userSessionId }),
                get(`account/${userId}/rated/tv`, { session_id: userSessionId }),
                get(`account/${userId}/rated/tv/episodes`, { session_id: userSessionId }),
                get(`account/${userId}/watchlist/movies`, { session_id: userSessionId }),
                get(`account/${userId}/watchlist/tv`, { session_id: userSessionId }),
            ])
            .then(results => results.map(r => r.data.results));
            res.json({
                createdLists,
                favourites: {
                    movies: favouriteMovies,
                    shows: favouriteShows
                },
                rated: {
                    movies: ratedMovies,
                    shows: ratedShows,
                    episodes: ratedEpisodes
                },
                watchlists: {
                    movies: movieWatchlist,
                    shows: showWatchlist
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401);
    }
}