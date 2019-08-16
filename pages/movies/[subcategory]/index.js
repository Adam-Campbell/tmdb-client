import React from 'react';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies
} from '../../../clientApi';
import ExploreMediaPage from '../../../components/ExploreMediaPage';
import { a } from '../../../axiosClient';

export function getFetchingFn(subcategory) {
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

export function getTitle(subcategory) {
    switch (subcategory) {
        case 'popular':
            return 'Popular Movies';
        case 'top-rated':
            return 'Top Rated Movies';
        case 'now-playing':
            return 'Now Playing Movies';
        case 'upcoming':
            return 'Upcoming Movies';
        default:
            return 'Popular Movies';
    }
}

function MoviesWithSubcategory({ results, subcategory }) {

    const fetchingFn = getFetchingFn(subcategory);
    const title = getTitle(subcategory);

    return (
        <ExploreMediaPage 
            title={title}
            initialData={results}
            getDataFn={fetchingFn}
            subcategory={subcategory}
        />
    );
}

MoviesWithSubcategory.getInitialProps = async ({ query }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const [ page1, page2 ] = await Promise.all([
        fetchingFn(),
        fetchingFn(2),
    ]);
    return {
        results: [ ...page1, ...page2 ],
        subcategory
    };
};

export default MoviesWithSubcategory;
