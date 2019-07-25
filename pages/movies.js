import React from 'react';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies
} from '../Api';
import MediaListView from '../components/MediaListView';


function Movies(props) { 
    return (
        <>
            <main>
                <MediaListView 
                    title="Movies"
                    items={props.results}
                    urlSubpath="/movie"
                /> 
            </main>
        </>
    );
}


Movies.getInitialProps = async ({ query, req }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn();
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        subcategory,
        ...serverInfo
    };
}

function getFetchingFn(subcategory) {
    switch (subcategory) {
        case 'popular':
            return getPopularMovies;
        case 'top-rated':
            return getTopRatedMovies;
        case 'now-playing':
            return getNowPlayingMovies;
        case 'upcoming':
            return getUpcomingMovies;
        default:
            return getPopularMovies;
    }
}

export default Movies;
