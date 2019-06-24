import React from 'react';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies
} from '../Api';
import SubNav from '../components/SubNav';
import MediaListView from '../components/MediaListView';

const navData = [
    {
        as: '/movies',
        href: '/movies?subcategory=popular',
        name: 'Popular'
    },
    {
        as: '/movies/top-rated',
        href: '/movies?subcategory=top-rated',
        name: 'Top rated'
    },
    {
        as: '/movies/now-playing',
        href: '/movies?subcategory=now-playing',
        name: 'Now playing'
    },
    {
        as: '/movies/upcoming',
        href: '/movies?subcategory=upcoming',
        name: 'Upcoming'
    }
];

function Movies(props) { 
    return (
        <>
            <SubNav navData={navData} />
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
