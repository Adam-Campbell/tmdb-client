import React, { 
    useState, 
    useMemo,
    useEffect, 
    useReducer,
    useRef,
    useCallback,
    Component 
} from 'react';
import styled from 'styled-components';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies
} from '../Api';
import MediaListView from '../components/MediaListView';
import ListViewHeader from '../components/ListViewHeader';
import { MediaCard } from '../components/Cards';
import { Row } from '../components/Layout';
import { useInView } from 'react-intersection-observer';
import usePrevious from '../components/usePrevious';

const MediaCardsContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
`;

function Sentinel({ isLoading, getNextPage }) {
    //console.log('Sentinel rendered');
    const [ ref, inView, entry ] = useInView({
        rootMargin: '0px 0px 200px 0px'
    });

    const prevInView = usePrevious(inView);

    useEffect(() => {
        console.log('Sentinel effect ran');
        if (inView && !prevInView && !isLoading) {
            console.log('Sentinel effect made it past conditional check');
            getNextPage();
        }
    }, [ inView, prevInView, isLoading, getNextPage ]);

    return <div ref={ref}></div>
}



function reducer(state, action) {
    switch (action.type) {

        case 'FETCH_DATA_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                moviesData: [ ...state.moviesData, ...action.payload.moviesData ],
                currentPage: state.currentPage + 1,
                isLoading: false
            };
    }
}

const StyledLoadingIndicator = styled.div`
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
`;


function LoadingIndicator({ isLoading }) {
    return isLoading ? (
        <StyledLoadingIndicator>Loading more data...</StyledLoadingIndicator>
    ) : null;
}

function Movies({ results }) { 
    //console.log('Movies rendered');
    const [ state, dispatch ] = useReducer(
        reducer, 
        {
            moviesData: results,
            currentPage: 1,
            isLoading: false
        }
    );

    const { moviesData, currentPage, isLoading } = state;

    async function getNextPage() {
        if (currentPage >= 10) return;
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        const newMoviesData = await getPopularMovies(currentPage + 1);
        dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: {
                moviesData: newMoviesData
            }
        });
    }

    return (
        <>
            <main>
                <ListViewHeader title="Movies" />
                <MediaCardsContainer>
                {moviesData.map(item => (
                    <MediaCard 
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name}
                        releaseDate={item.release_date || item.first_air_date}
                        averageRating={item.vote_average}
                        backdropPath={item.backdrop_path}
                        posterPath={item.poster_path}
                        overview={item.overview}
                        urlSubpath="/movie"
                    />  
                ))}
                </MediaCardsContainer>
                <Sentinel 
                    isLoading={isLoading}
                    getNextPage={getNextPage}
                />
                <LoadingIndicator isLoading={isLoading} />
            </main>
        </>
    );
}


Movies.getInitialProps = async ({ query, req }) => {
    const { subcategory } = query;
    const fetchingFn = getFetchingFn(subcategory);
    const results = await fetchingFn();
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        subcategory,
        ...serverInfo
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


/*

<MediaListView 
                    title="Movies"
                    items={props.results}
                    urlSubpath="/movie"
                /> 

*/