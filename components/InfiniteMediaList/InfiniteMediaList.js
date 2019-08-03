import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
import reducer from './reducer';
import Sentinel from './Sentinel';
import LoadingIndicator from './LoadingIndicator';


export function InfiniteMediaList({ initialData, getDataFn }) {

    const [ state, dispatch ] = useReducer(
        reducer, 
        {
            mediaData: initialData,
            currentPage: 1,
            isLoading: false
        }
    );

    const { mediaData, currentPage, isLoading } = state;

    async function getNextPage() {
        if (currentPage >= 10) return;
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        const newMediaData = await getDataFn(currentPage + 1);
        dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: {
                mediaData: newMediaData
            }
        });
    }

    return (
        <>
            <Row>
                {mediaData.map(item => (
                    <MediaCard 
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name}
                        releaseDate={item.release_date || item.first_air_date}
                        averageRating={item.vote_average}
                        backdropPath={item.backdrop_path}
                        posterPath={item.poster_path}
                        overview={item.overview}
                        urlSubpath={item.title ? '/movie' : '/show'}
                    />  
                ))}
            </Row>
            <Sentinel 
                isLoading={isLoading}
                getNextPage={getNextPage}
            />
            <LoadingIndicator isLoading={isLoading} />
        </>
    );
}

InfiniteMediaList.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
    getDataFn: PropTypes.func.isRequired
};