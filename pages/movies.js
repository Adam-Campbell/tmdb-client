import React from 'react';
import styled from 'styled-components';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies
} from '../Api';
import MediaListView from '../components/MediaListView';
import ListViewHeader from '../components/ListViewHeader';
import InfiniteMediaList from '../components/InfiniteMediaList';

function Movies({ results, subcategory }) { 
    
    const fetchingFn = getFetchingFn(subcategory);

    return (
        <>
            <main>
                <ListViewHeader title="Movies" />
                <InfiniteMediaList 
                    initialData={results}
                    getDataFn={fetchingFn}
                    key={subcategory}
                />
            </main>
        </>
    );
}


Movies.getInitialProps = async ({ query, req }) => {
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
