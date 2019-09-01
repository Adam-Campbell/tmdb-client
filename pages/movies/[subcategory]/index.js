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

export function getPageLinks(subcategory) {
    return {
        pageLinkAs: `/movies/${subcategory}`,
        pageLinkHref: `/movies/[subcategory]`,
    };
}

function MoviesWithSubcategory({ results, currentPage, subcategory }) {

    //const fetchingFn = getFetchingFn(subcategory);
    const title = getTitle(subcategory);
    const { pageLinkAs, pageLinkHref } = getPageLinks(subcategory);

    return (
        <ExploreMediaPage 
            title={title}
            mediaData={results}
            currentPage={currentPage}
            pageLinkAs={pageLinkAs}
            pageLinkHref={pageLinkHref}
        />
    );
}

MoviesWithSubcategory.getInitialProps = async ({ query }) => {
    const { subcategory } = query;
    const currentPage = parseInt(query.page || 1);
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn(currentPage);
    return {
        results,
        currentPage,
        subcategory
    };
};

export default MoviesWithSubcategory;
