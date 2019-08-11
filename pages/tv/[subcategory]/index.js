import React from 'react';
import {
    getPopularTV,
    getTopRatedTV,
    getOnAirTV,
    getAiringTodayTV,
} from '../../../Api';
import ExploreMediaPage from '../../../components/ExploreMediaPage';

function getFetchingFn(subcategory) {
    switch (subcategory) {
        case 'popular':
            return getPopularTV;
        case 'top-rated':
            return getTopRatedTV;
        case 'on-tv':
            return getOnAirTV;
        case 'airing-today':
            return getAiringTodayTV;
        default:
            return getPopularTV;
    }
}

export function getTitle(subcategory) {
    switch (subcategory) {
        case 'popular':
            return 'Popular TV Shows';
        case 'top-rated':
            return 'Top Rated TV Shows';
        case 'on-tv':
            return 'TV Shows On Air';
        case 'airing-today':
            return 'TV Shows Airing Today';
        default:
            return 'Popular TV Shows';
    }
}

function TVWithSubcategory({ results, subcategory }) {

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

TVWithSubcategory.getInitialProps = async ({ query }) => {
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

export default TVWithSubcategory;
