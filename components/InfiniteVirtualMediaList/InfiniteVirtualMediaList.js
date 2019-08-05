import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
import { reducer, getNextWindow, doesWindowExceed } from './utils';
import Sentinel from './Sentinel';
import CardPlaceholder from './CardPlaceholder';
 
export function InfiniteVirtualMediaList({ initialData, getDataFn }) {

    const [ state, dispatch ] = useReducer(reducer, {
        cardData: initialData,
        page: 1,
        currentWindow: [0, 20],
        furthestWindow: [0, 20]
    });

    const { cardData, page, currentWindow, furthestWindow } = state;

    async function pageForwards() {
        dispatch({ type: 'PAGE_FORWARDS' });
        const nextWindow = getNextWindow(currentWindow);
        const doesExceed = doesWindowExceed(nextWindow, furthestWindow);
        if (doesExceed && page <= 20) {
            const nextCardData = await getDataFn(page + 1);
            dispatch({
                type: 'STORE_NEXT_CARD_DATA',
                payload: {
                    nextCardData,
                    page: page + 1
                }
            });
        }

    }

    function pageBackwards() {
        dispatch({ type: 'PAGE_BACKWARDS' });
    }

    const cardHeight = 351;

    const paddingTop = currentWindow[0] * cardHeight;
    const paddingBottom = (furthestWindow[0] - currentWindow[0]) * cardHeight;

    return (
        <div style={{ paddingTop, paddingBottom }}>
            <Sentinel name="The top sentinel" handleEnter={pageBackwards} />
            <Row>
                {cardData.slice(...currentWindow).map((card, idx) => {
                    return card ?
                        <MediaCard
                            key={idx}
                            id={card.id}
                            title={card.title || card.name}
                            releaseDate={card.release_date || card.first_air_date}
                            averageRating={card.vote_average}
                            backdropPath={card.backdrop_path}
                            posterPath={card.poster_path}
                            overview={card.overview}
                            urlSubpath={card.title ? '/movie' : '/show'}
                        /> :
                        <CardPlaceholder key={idx} />
                })}
            </Row>
            <Sentinel name="The bottom sentinel" handleEnter={pageForwards} />
        </div>
    );
}

InfiniteVirtualMediaList.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
    getDataFn: PropTypes.func.isRequired
};
