import React, { useState } from 'react';
import Link from 'next/link';
import {
    getPopularTV,
    getTopRatedTV,
    getOnAirTV,
    getAiringTodayTV,
    getPopularMovies
} from '../Api';
import MediaListView from '../components/MediaListView';
import ListViewHeader from '../components/ListViewHeader';
import InfiniteMediaList from '../components/InfiniteMediaList';

function TV({ results, subcategory }) {

    const fetchingFn = getFetchingFn(subcategory)

    return (
        <>
            <main>
                <ListViewHeader title="TV shows" />
                <InfiniteMediaList 
                    initialData={results}
                    getDataFn={fetchingFn}
                    key={subcategory}
                />
            </main>
        </>
    );
};


TV.getInitialProps = async ({ query, req }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn();
    return {
        results,
        subcategory,
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

/*

<MediaListView 
                    title="TV"
                    items={props.results}
                    urlSubpath="/show"
                />

*/