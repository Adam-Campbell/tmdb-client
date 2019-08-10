import React, { useState, useEffect } from 'react';
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
import InfiniteVirtualMediaList from '../components/InfiniteVirtualMediaList';

const Main = styled.main`
    min-height: 100vh;
`;

function Movies({ results, subcategory }) { 
    
    const fetchingFn = getFetchingFn(subcategory);

    const [ showList, setShowList ] = useState(false);

    useEffect(() => {
        setShowList(true);
    }, []);

    return (
        <>
            <Main>
                <ListViewHeader title="Movies" />
                {showList && <InfiniteVirtualMediaList 
                    initialData={results}
                    getDataFn={fetchingFn}
                    key={subcategory}
                />}
            </Main>
        </>
    );
}


Movies.getInitialProps = async ({ query, req }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    //const results = await fetchingFn();
    const [ page1, page2 ] = await Promise.all([
        fetchingFn(),
        fetchingFn(2),
    ]);
    return {
        results: [ ...page1, ...page2 ],
        //results,
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
