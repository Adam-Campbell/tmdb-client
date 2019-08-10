import React, { useReducer, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import { MediaCard } from '../Cards';
//import { reducer, getNextWindow, doesWindowExceed } from './utils';
import Sentinel from './Sentinel';
import CardPlaceholder from './CardPlaceholder';
import usePrevious from '../usePrevious';
import { 
    reducer, 
    deriveWindowFromPage, 
    deriveApiPageFromPage, 
    getPaddingNum, 
    setPx 
} from './newUtils';


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


Fixed:

- The phantom padding when scrolling back to the top has been resolved - it was being causes by some of
one or more of the sliding operations trying to set a negative padding value, which just results in the
command being ignored. Fixed by ensuring that all padding setting operations use a clamped value that
cannot be less than 0. 



*/

 
export function InfiniteVirtualMediaList({ initialData, getDataFn }) {

    const [ state, dispatch ] = useReducer(reducer, {
        cardData: initialData,
        currentPage: 1,
        furthestPage: 1
    });

    const { cardData, currentPage, furthestPage } = state;

    const prevState = usePrevious(state);

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
        // this part will always need to happen
        if (windowOneStart.current && windowOneEnd.current) {
            const windowOneTop = windowOneStart.current.getBoundingClientRect().top;
            const windowOneBottom = windowOneEnd.current.getBoundingClientRect().bottom;
            const windowOneHeight = windowOneBottom - windowOneTop;
            windowOneHeightCache.current = windowOneHeight;
        }
        // take the currentPage, add 1, derive the end index from it and determine whether
        // incrementing the page causes us to exceed the current cardData.
        const nextPage = currentPage + 1;
        const nextPageUpperBound = deriveWindowFromPage(nextPage)[1]; 
        // It if does, await the fetching of the new cardData, and then dispatch the
        // PAGE_FORWARDS_WITH_NEW_DATA action.
        if (nextPageUpperBound > cardData.length && nextPage < 9) {
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
            console.log('Sliding downwards padding adjustment would take place here - internal slide'); 
            const windowTwoTop = windowTwoStart.current.getBoundingClientRect().top;
            const windowTwoBottom = windowTwoEnd.current.getBoundingClientRect().bottom;
            const windowTwoHeight = windowTwoBottom - windowTwoTop;

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
            console.log('Sliding downwards padding adjustment would take place here - external slide');
            const c = containerRef.current;
            const oldTopPadding = getPaddingNum(c.style.paddingTop);
            c.style.paddingTop = setPx(oldTopPadding + (windowOneHeightCache.current+20));
        }
    }, [ state, prevState ]);

    const currentWindow = deriveWindowFromPage(currentPage);
    
    return (
        <div ref={containerRef}>
            <Sentinel name="The top sentinel" handleEnter={handlePageBackward} />
            <Row>
                {cardData.slice(...currentWindow).map((card, idx) => (
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
                    /> 
                ))}
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
