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
        text: 'Popular movies'
    },
    {
        as: '/movies/top-rated',
        href: '/movies?subcategory=top-rated',
        text: 'Top rated movies'
    },
    {
        as: '/movies/now-playing',
        href: '/movies?subcategory=now-playing',
        text: 'Now playing movies'
    },
    {
        as: '/movies/upcoming',
        href: '/movies?subcategory=upcoming',
        text: 'Upcoming movies'
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
                    urlSubpath="foo"
                /> 
            </main>
        </>
    );
}


Movies.getInitialProps = async ({ query }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn();
    return {
        results,
        subcategory
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
