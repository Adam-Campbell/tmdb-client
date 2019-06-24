import React, { useState } from 'react';
import Link from 'next/link';
import {
    getPopularTV,
    getTopRatedTV,
    getOnAirTV,
    getAiringTodayTV,
    getPopularMovies
} from '../Api';
import SubNav from '../components/SubNav';
import MediaListView from '../components/MediaListView';

const navData = [
    {
        as: '/tv',
        href: '/tv?subcategory=popular',
        name: 'Popular'
    },
    {
        as: '/tv/top-rated',
        href: '/tv?subcategory=top-rated',
        name: 'Top rated'
    },
    {
        as: '/tv/on-tv',
        href: '/tv?subcategory=on-tv',
        name: 'On TV'
    },
    {
        as: '/tv/airing-today',
        href: '/tv?subcategory=airing-today',
        name: 'Airing today'
    }
];

function TV(props) {
    return (
        <>
            <SubNav navData={navData} />
            <main>
                <MediaListView 
                    title="TV"
                    items={props.results}
                    urlSubpath="/show"
                />
            </main>
        </>
    );
};


TV.getInitialProps = async ({ query, req }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn();
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        subcategory,
        ...serverInfo
    };
};

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

export default TV;