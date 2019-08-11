import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
import InfiniteVirtualMediaList from '../components/InfiniteVirtualMediaList';

const Main = styled.main`
    min-height: 100vh;
`;

function TV({ results, subcategory }) {

    const fetchingFn = getFetchingFn(subcategory);

    const [ showList, setShowList ] = useState(false);

    useEffect(() => {
        setShowList(true);
    }, []);

    return (
        <>
            <Main>
                <ListViewHeader title="TV shows" />
                {showList && <InfiniteVirtualMediaList 
                    initialData={results}
                    getDataFn={fetchingFn}
                    key={subcategory}
                />}
            </Main>
        </>
    );
};


TV.getInitialProps = async ({ query, req }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const [ page1, page2 ] = await Promise.all([
        fetchingFn(),
        fetchingFn(2)
    ]);
    return {
        results: [ ...page1, ...page2  ],
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
