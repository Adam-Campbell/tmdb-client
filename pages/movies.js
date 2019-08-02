import React, { useState, useEffect, useReducer } from 'react';
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

const MediaCardsContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
`;

function TriggerDiv({ isFetching, currentPage, dispatch }) {

    const [ ref, inView, entry ] = useInView();

    useEffect(() => {
        console.log(`TriggerDiv in view? ${inView}`);
        console.log(entry);

        // async function fetchResults() {
        //     console.log('fetchResults was called!');
        //     if (isFetching || !inView || currentPage >= 6) return;
        //     console.log('fetchResults made it past the conditional check!');
        //     dispatch({ type: actionTypes.FETCH_RESULTS_REQUEST });
        //     await new Promise((resolve) => setTimeout(resolve, 3000));
        //     const results = await getPopularMovies(currentPage + 1);
        //     dispatch({
        //         type: actionTypes.FETCH_RESULTS_SUCCESS,
        //         payload: { results }
        //     });
        //     console.log('fetchResults made it all the way to the end');
        // }
        // fetchResults();
    }, [ inView, isFetching, currentPage, entry ]);

    return <div ref={ref}></div>
}

const actionTypes = {
    FETCH_RESULTS_REQUEST: 'FETCH_RESULTS_REQUEST',
    FETCH_RESULTS_SUCCESS: 'FETCH_RESULTS_SUCCESS'
};



function reducer(state, action) {
    switch (action.type) {
        case actionTypes.FETCH_RESULTS_REQUEST:
            return {
                ...state, 
                isFetching: true
            };

        case actionTypes.FETCH_RESULTS_SUCCESS:
            return {
                ...state, 
                movieResults: [ ...state.movieResults, ...action.payload.results ],
                currentPage: state.currentPage + 1,
                isFetching: false
            }
    }
}

function Movies({ results }) { 

    const [ state, dispatch ] = useReducer(
        reducer, 
        {
            movieResults: results,
            currentPage: 1,
            isFetching: false
        }
    );

    function fetchResultsRequest() {
        dispatch({ type: actionTypes.FETCH_RESULTS_REQUEST });
    }

    function fetchResultsSuccess(results, page) {
        dispatch({
            type: actionTypes.FETCH_RESULTS_SUCCESS,
            payload: {
                results,
                page
            }
        })
    }

    // const [ movieResults, updateMovieResults ] = useState(results);
    // const [ resultsPage, updateResultsPage ] = useState(1);

    // const [ isFetching, setIsFetching ] = useState(false);

    // const [ switchValue, setSwitch ] = useState(false);

    // async function makeNextApiCall() {
    //     console.log('makeNextApiCall was called');
    //     if (isFetching) return;
    //     console.log('isFetching was false when that happened so it made it past conditional');
    //     setIsFetching(true);
    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     const results = await getPopularMovies(resultsPage + 1);
    //     updateMovieResults(prev => ([ ...prev, ...results ]));
    //     updateResultsPage(prev => prev + 1);
    //     setIsFetching(false);
    // }

    return (
        <>
            <main>
                <ListViewHeader title="Movies" />
                <MediaCardsContainer>
                {state.movieResults.map(item => (
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
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        //makeNextApiCall()
                    }}
                >Fetch more results</button>
                <TriggerDiv 
                    isFetching={state.isFetching}
                    currentPage={state.currentPage}
                    dispatch={dispatch}
                />
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