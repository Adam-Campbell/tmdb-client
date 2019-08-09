import React, { useReducer, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
//import { reducer, getNextWindow, doesWindowExceed } from './utils';
import Sentinel from './Sentinel';
import CardPlaceholder from './CardPlaceholder';
import usePrevious from '../usePrevious';
import { reducer, deriveWindowFromPage, deriveApiPageFromPage, getPaddingNum } from './newUtils';


/*

Current progress: 

I have the new reducer logic in place, and have useLayoutEffect set up to constantly remeasure the items
and adjust the container padding accordingly. 

- I haven't tested on mobile yet (only through chrome emulator).

- The layout does seem to jump a bit, intermitently, when scrolling down. Investigate.

- There seems to be issues with the addition / removal of container padding not staying properly
lined up at smaller viewports (where the layout of the cards changes). Additionally, when paging
backwards (scrolling up) there seems to be a whole page worth of top padding left at the end even
when we've reached the first page, meaning that there is a large white gap above the list that
won't go away. 

Look into all of these issues. 

*/

 
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

    

    const windowOneStart = useRef(null);
    const windowOneEnd = useRef(null);
    const windowTwoStart = useRef(null);
    const windowTwoEnd = useRef(null);
    const containerRef = useRef(null);
    const windowOneHeightCache = useRef(0);
    const windowTwoHeightCache = useRef(0);

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

    async function handlePageForward() {
        if (currentPage > 8) return;
        if (windowOneStart.current && windowOneEnd.current) {
            const windowOneTop = windowOneStart.current.getBoundingClientRect().top;
            const windowOneBottom = windowOneEnd.current.getBoundingClientRect().bottom;
            const windowOneHeight = windowOneBottom - windowOneTop;
            windowOneHeightCache.current = windowOneHeight;
        }
        dispatch({ type: 'PAGE_FORWARDS' });
        const nextPage = currentPage + 1;
        const nextPageUpperBound = deriveWindowFromPage(nextPage)[1];
        if (nextPageUpperBound > cardData.length && nextPage < 9) {
            // fetch the data
            console.log('made it into conditional');
            //console.log(nextPage);
            const nextCardData = await getDataFn(nextPage);
            console.log(nextCardData);
            dispatch({
                type: 'STORE_CARD_DATA',
                payload: {
                    cardData: nextCardData,
                    page: deriveApiPageFromPage(nextPage)
                }
            });
        }
    }

    function handlePageBackward() {
        if (windowTwoStart.current && windowTwoEnd.current) {
            const windowTwoTop = windowTwoStart.current.getBoundingClientRect().top;
            const windowTwoBottom = windowTwoEnd.current.getBoundingClientRect().bottom;
            const windowTwoHeight = windowTwoBottom - windowTwoTop;
            windowTwoHeightCache.current = windowTwoHeight;
        }
        dispatch({ type: 'PAGE_BACKWARDS' });
    }

    useLayoutEffect(() => {
        console.log(windowOneHeightCache, windowTwoHeightCache);
        //return;
        if (!prevState) return;

        // When sliding upwards, the height of the first window (elements 0-9) after sliding needs to
        // be subtracted from the containers padding. The height of the second window (elements 10-19)
        // before sliding (accessed through a mutable ref) need to be added to the containers bottom
        // padding. 
        if (state.currentPage < prevState.currentPage) {
            console.log('Sliding upwards padding adjustment would take place here');

            const windowOneTop = windowOneStart.current.getBoundingClientRect().top;
            const windowOneBottom = windowOneEnd.current.getBoundingClientRect().bottom;
            const windowOneHeight = windowOneBottom - windowOneTop;

            const c = containerRef.current;
            const oldBottomPadding = getPaddingNum(c.style.paddingBottom);
            const oldTopPadding = getPaddingNum(c.style.paddingTop);
            
            c.style.paddingTop = `${oldTopPadding - (windowOneHeight+20)}px`;
            c.style.paddingBottom = `${oldBottomPadding + (windowTwoHeightCache.current+20)}px`;
        } 
        // This condition represents sliding down to a page that we have already visited, and therefore
        // its height is already account for, so we don't need to add any additional height to the page,
        // but rather redistribute it between the top and bottom padding. The height of the first window
        // from before the slide (stored in mutable ref) is added to the top padding. The height of the
        // second window after the slide is subtracted from the bottom padding. 
        else if (state.currentPage > prevState.currentPage && 
                state.cardData[state.cardData.length-1] !== undefined
        ) {
            console.log('Sliding downwards padding adjustment would take place here - internal slide'); 
            const windowTwoTop = windowTwoStart.current.getBoundingClientRect().top;
            const windowTwoBottom = windowTwoEnd.current.getBoundingClientRect().bottom;
            const windowTwoHeight = windowTwoBottom - windowTwoTop;

            const c = containerRef.current;
            const oldBottomPadding = getPaddingNum(c.style.paddingBottom);
            const oldTopPadding = getPaddingNum(c.style.paddingTop);

            c.style.paddingTop = `${oldTopPadding + (windowOneHeightCache.current+20)}px`;
            c.style.paddingBottom = `${oldBottomPadding - (windowTwoHeight+20)}px`;
            
        } 
        // This condition represents sliding down into a new page that isn't yet accounted for in the pages
        // height. As with the previous condition the height of the first window prior to the slide is added
        // to the top padding, however unlike the previous condition we don't need to do anything to the
        // bottom padding. 
        else if (prevState.cardData[prevState.cardData.length-1] === undefined &&
                    state.cardData[state.cardData.length-1] !== undefined
        ) {
            console.log('Sliding downwards padding adjustment would take place here - external slide');
            const c = containerRef.current;
            const oldTopPadding = getPaddingNum(c.style.paddingTop);
            c.style.paddingTop = `${oldTopPadding + (windowOneHeightCache.current+20)}px`;
        }
    }, [ state, prevState ]);

    // useEffect(() => {
    //     if (
    //         !windowOneStart.current || !windowOneEnd.current || 
    //         !windowTwoStart.current || !windowTwoEnd.current
    //     ) {
    //         return;
    //     } 
    //     const windowOneTop = windowOneStart.current.getBoundingClientRect().top;
    //     const windowOneBottom = windowOneEnd.current.getBoundingClientRect().bottom;
    //     const windowTwoTop = windowTwoStart.current.getBoundingClientRect().top;
    //     const windowTwoBottom = windowTwoEnd.current.getBoundingClientRect().bottom;

    //     const windowOneRange = windowOneBottom - windowOneTop;
    //     const windowTwoRange = windowTwoBottom - windowTwoTop;
    //     //console.log(windowOneRange, windowTwoRange);
    //     if (containerRef.current) {
    //         const { paddingTop, paddingBottom } = containerRef.current.style;
    //         console.log(paddingTop, paddingBottom);
    //     }
    // })

    //console.log(cardData)
    //console.log(state);

    const cardHeight = 351;

    const currentWindow = deriveWindowFromPage(currentPage);
    const furthestWindow = deriveWindowFromPage(furthestPage);

    const paddingTop = currentWindow[0] * cardHeight;
    const paddingBottom = (furthestWindow[0] - currentWindow[0]) * cardHeight;

    // style={{ paddingTop, paddingBottom }}
    return (
        <div ref={containerRef}>
            <Sentinel name="The top sentinel" handleEnter={handlePageBackward} />
            <Row>
                {cardData.slice(...currentWindow).map((card, idx) => {
                    return card ?
                        <MediaCard
                            cardRef={getRef(idx)}
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
                        <CardPlaceholder key={idx} cardRef={getRef(idx)} />
                })}
            </Row>
            <Sentinel 
                name="The bottom sentinel" 
                handleEnter={handlePageForward} 
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