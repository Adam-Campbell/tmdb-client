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

function TV(props) {
    return (
        <>
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