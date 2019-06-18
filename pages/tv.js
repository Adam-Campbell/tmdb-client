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
        text: 'Popular TV'
    },
    {
        as: '/tv/top-rated',
        href: '/tv?subcategory=top-rated',
        text: 'Top rated TV'
    },
    {
        as: '/tv/on-tv',
        href: '/tv?subcategory=on-tv',
        text: 'On TV'
    },
    {
        as: '/tv/airing-today',
        href: '/tv?subcategory=airing-today',
        text: 'Airing today'
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
                    urlSubpath="foo"
                />
            </main>
        </>
    );
};


TV.getInitialProps = async ({ query }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn();
    return {
        results,
        subcategory
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