import React, { useReducer, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
//import { reducer, getNextWindow, doesWindowExceed } from './utils';
import Sentinel from './Sentinel';
import CardPlaceholder from './CardPlaceholder';
import usePrevious from '../usePrevious';
import { reducer, handlePageForward, deriveWindowFromPage } from './newUtils';
 
export function InfiniteVirtualMediaList({ initialData, getDataFn }) {

    const [ state, dispatch ] = useReducer(reducer, {
        cardData: initialData,
        currentPage: 1,
        furthestPage: 1
    });

    const { cardData, currentPage, furthestPage } = state;

    const prevState = usePrevious(state);

    // async function pageForwards() {
    //     if (page > 8) {
    //         return;
    //     }
    //     dispatch({ type: 'PAGE_FORWARDS' });
    //     const nextWindow = getNextWindow(currentWindow);
    //     const doesExceed = doesWindowExceed(nextWindow, furthestWindow);
    //     //console.log(nextWindow, cardData.length);
    //     if (doesExceed && nextWindow[1] > cardData.length && page <= 20) {
    //         //console.log('made it into conditional block to fetch more data');
    //         const nextCardData = await getDataFn(page + 1);
    //         dispatch({
    //             type: 'STORE_NEXT_CARD_DATA',
    //             payload: {
    //                 nextCardData,
    //                 page: page + 1
    //             }
    //         });
    //     }
    // }

    function handlePageBackward() {
        dispatch({ type: 'PAGE_BACKWARDS' });
    }

    

    //console.log(cardData)
    console.log(state);

    const cardHeight = 351;

    const currentWindow = deriveWindowFromPage(currentPage);
    const furthestWindow = deriveWindowFromPage(furthestPage);

    const paddingTop = currentWindow[0] * cardHeight;
    const paddingBottom = (furthestWindow[0] - currentWindow[0]) * cardHeight;

    // style={{ paddingTop, paddingBottom }}
    return (
        <div style={{ paddingTop, paddingBottom }}>
            <Sentinel name="The top sentinel" handleEnter={handlePageBackward} />
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
            <Sentinel 
                name="The bottom sentinel" 
                handleEnter={() => handlePageForward(state, dispatch, getDataFn)} 
            />
        </div>
    );
}

InfiniteVirtualMediaList.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
    getDataFn: PropTypes.func.isRequired
};




/*

const windowOneStart = useRef(null);
    const windowOneEnd = useRef(null);
    const windowTwoStart = useRef(null);
    const windowTwoEnd = useRef(null);
    const containerRef = useRef(null);

    function getRef(idx) {
        switch (idx) {
            case 0:
                return windowOneStart;
            case 9:
                return windowOneEnd;
            case 10: 
                return windowTwoStart;
            case 19:
                return windowTwoEnd;
            default:
                return null;
        } 
    }

    useEffect(() => {
        //console.log(windowOneStart, windowOneEnd, windowTwoStart, windowTwoEnd);
        if (
            !windowOneStart.current || !windowOneEnd.current || 
            !windowTwoStart.current || !windowTwoEnd.current
        ) {
            return;
        } 

        const windowOneTop = windowOneStart.current.getBoundingClientRect().top;
        const windowOneBottom = windowOneEnd.current.getBoundingClientRect().bottom;
        const windowTwoTop = windowTwoStart.current.getBoundingClientRect().top;
        const windowTwoBottom = windowTwoEnd.current.getBoundingClientRect().bottom;

        const windowOneRange = windowOneBottom - windowOneTop;
        const windowTwoRange = windowTwoBottom - windowTwoTop;
        //console.log(windowOneRange, windowTwoRange);

        if (prevState) {
            const previous = prevState.cardData.slice(prevState.currentWindow[0] + 10, prevState.currentWindow[1]);
            const current = cardData.slice(currentWindow[0] + 10, currentWindow[1]);
            //console.log('previous: ', previous);
            //console.log('current: ', current);
            if (previous[9] === undefined && current[9] !== undefined) {
                //console.log('All criteria were met on this render');
            } else {
                //console.log('There was previous data, but the undefined check did not pass on this render');
            }
        } else {
            //console.log('There was no previous data for this render');
        }
        
    }, [ cardData, currentWindow, prevState ]);



*/