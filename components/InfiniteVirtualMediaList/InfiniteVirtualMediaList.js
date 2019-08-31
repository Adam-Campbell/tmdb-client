import React, { useReducer, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
import Sentinel from './Sentinel';
import usePrevious from '../usePrevious';
import { 
    reducer, 
    deriveWindowFromPage, 
    deriveApiPageFromPage, 
    getPaddingNum, 
    setPx,
    calculateWindowHeight
} from './utils';

export function InfiniteVirtualMediaList({ initialData, getDataFn }) {

    const [ state, dispatch ] = useReducer(reducer, {
        cardData: initialData,
        currentPage: 1,
        furthestPage: 1
    });

    const { cardData, currentPage, furthestPage } = state;

    const prevState = usePrevious(state);

    // Two 'windows' of 10 cards each will be rendered at any given time, these refs are
    // assigned to the cards at the start and end of each of those windows.
    const windowOneStart = useRef(null);
    const windowOneEnd = useRef(null);
    const windowTwoStart = useRef(null);
    const windowTwoEnd = useRef(null);
    // This ref will be assigned to the container element, which will have padding values assigned
    // to it in order to simulate expansion and traversal of the page.
    const containerRef = useRef(null);
    // In order to calculate the correct padding values after a window update has occurred, we need
    // to know the height of one of the windows from before the update. Those heights are captured
    // just before the window update and stored in these refs to be accessed after the update.
    const windowOneHeightCache = useRef(0);
    const windowTwoHeightCache = useRef(0);

    // Returns either a specific ref, or null, depending on the index value provided. When rendering
    // a set of cards all of their refs can be set by calling this function for each card with that
    // cards index, removing this logic from the actual mapping operation.
    function getCardRef(idx) {
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

    // Contains all logic for moving down to the next page/window, including data fetching when required.
    async function handlePageForward() {
        if (currentPage > 20) return;
        windowOneHeightCache.current = calculateWindowHeight(windowOneStart, windowOneEnd);
        // take the currentPage, add 1, derive the end index from it and determine whether
        // incrementing the page causes us to exceed the current cardData.
        const nextPage = currentPage + 1;
        const nextPageUpperBound = deriveWindowFromPage(nextPage)[1]; 
        // It if does, await the fetching of the new cardData, and then dispatch the
        // PAGE_FORWARDS_WITH_NEW_DATA action.
        if (nextPageUpperBound > cardData.length && nextPage < 20) {
            const nextCardData = await getDataFn(
                deriveApiPageFromPage(nextPage)
            );
            dispatch({
                type: 'PAGE_FORWARDS_WITH_NEW_DATA',
                payload: {
                    cardData: nextCardData
                }
            });
            // It it doesn't, then just dispatch the PAGE_FORWARDS action. 
        } else {
            dispatch({ type: 'PAGE_FORWARDS' });
        }
    }

    // Contains all logic for moving up to the page/window.
    function handlePageBackward() {
        windowTwoHeightCache.current = calculateWindowHeight(windowTwoStart, windowTwoEnd);
        dispatch({ type: 'PAGE_BACKWARDS' });
    }

    // Responsible for updating the padding on the container element in order to simulate scrolling
    // through an actual list of DOM nodes. 
    useLayoutEffect(() => {
        if (!prevState) return;

        // When sliding upwards, the height of the first window (elements 0-9) after sliding needs to
        // be subtracted from the containers padding. The height of the second window (elements 10-19)
        // before sliding (accessed through a mutable ref) need to be added to the containers bottom
        // padding. 
        if (state.currentPage < prevState.currentPage) {
            const windowOneHeight = calculateWindowHeight(windowOneStart, windowOneEnd);
            const c = containerRef.current;
            const oldBottomPadding = getPaddingNum(c.style.paddingBottom);
            const oldTopPadding = getPaddingNum(c.style.paddingTop);
            
            c.style.paddingTop = setPx(oldTopPadding - (windowOneHeight+20));
            c.style.paddingBottom = setPx(oldBottomPadding + (windowTwoHeightCache.current+20));
        } 
        // This condition represents sliding down to a page that we have already visited, and therefore
        // its height is already account for, so we don't need to add any additional height to the page,
        // but rather redistribute it between the top and bottom padding. The height of the first window
        // from before the slide (stored in mutable ref) is added to the top padding. The height of the
        // second window after the slide is subtracted from the bottom padding. 
        else if (state.currentPage > prevState.currentPage && 
                state.currentPage < state.furthestPage
        ) {
            const windowTwoHeight = calculateWindowHeight(windowTwoStart, windowTwoEnd);
            const c = containerRef.current;
            const oldBottomPadding = getPaddingNum(c.style.paddingBottom);
            const oldTopPadding = getPaddingNum(c.style.paddingTop);

            c.style.paddingTop = setPx(oldTopPadding + (windowOneHeightCache.current+20));
            c.style.paddingBottom = setPx(oldBottomPadding - (windowTwoHeight+20));
        } 
        // This condition represents sliding down into a new page that isn't yet accounted for in the pages
        // height. As with the previous condition the height of the first window prior to the slide is added
        // to the top padding, however unlike the previous condition we don't need to do anything to the
        // bottom padding. 
        else if (state.currentPage > prevState.currentPage) {
            const c = containerRef.current;
            const oldTopPadding = getPaddingNum(c.style.paddingTop);
            c.style.paddingTop = setPx(oldTopPadding + (windowOneHeightCache.current+20));
        }
    }, [ state, prevState ]);

    const currentWindow = deriveWindowFromPage(currentPage);
    
    return (
        <div ref={containerRef}>
            <Sentinel handleEnter={handlePageBackward} />
            <Row>
                {cardData.slice(...currentWindow).map((card, idx) => (
                    <MediaCard
                        cardRef={getCardRef(idx)}
                        key={idx}
                        id={card.id}
                        title={card.title || card.name}
                        releaseDate={card.release_date || card.first_air_date}
                        averageRating={card.vote_average}
                        backdropPath={card.backdrop_path}
                        posterPath={card.poster_path}
                        overview={card.overview}
                        urlSubpath={card.title ? '/movie' : '/show'}
                    /> 
                ))}
            </Row>
            <Sentinel handleEnter={handlePageForward} />
        </div>
    );
}

InfiniteVirtualMediaList.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
    getDataFn: PropTypes.func.isRequired
};
