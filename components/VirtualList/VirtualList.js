import React, { 
    useState,
    useEffect,
    useLayoutEffect,
    useReducer,
} from 'react';
import styled from 'styled-components';
import { Row } from '../Layout';
import { reducer, getCardData } from './reducer';
import Card from './Card';
import Sentinel from './Sentinel';

/*

The component will not run properly in its current state.

I am currently in the process of incorporating cardData into the reducer state rather than the
standalone state above it. I have update the getCardData function to take a page number as its argument. 

In the initial implementation of this component I just initialized it with x amount of card data and then
didn't fetch any more after that, simply paged through the card data I already had. I'm now trying to 
move it to an approach where I start with only a single page of card data, and then fetch additional
pages when needed - this will make the transition into working with actually fetching actual data easier. 

What are the implications?

- It won't affect upwards scrolls / paging backwards, because these would never require data to be 
fetched. 

- It will affect some down scroll / paging forwards operations - some of them will require additional
data to be fetched. 

- Because the data will be fetched asynchronously, I need to allow for the case where we have paged
forwards to a specific place but the data data for those cards hasn't arrived yet - I need to construct
a placeholder card, or just enhance the current card component to handle not having any data (show a 
fallback description, don't display a number etc).

- Paging forwards and fetching data will necessarily be separate actions now, since paging forwards has to 
happen synchronously. So we page forwards and if that results in exceeding the pages of cards we have in the
cache, then that triggers the data fetching. So, we page forwards synchronously and exceed our cache so
we start seeing placeholders, simultaneously the data fetching is began. Then when the data comes back our
placeholders are replaced by the actual data. 

- I need to make my data fetching function async - just mimic it with a setTimeout.


*/

export function VirtualList(props) {

    const [ cardData, setCardData ] = useState(() => {
        return getCardData(60);
    });

    const [ state, dispatch ] = useReducer(reducer, {
        cardData: getCardData(1),
        currentWindow: [0, 20],
        furthestWindow: [0, 20]
    });

    const { currentWindow, furthestWindow } = state;

    function pageForwards() {
        dispatch({ type: 'PAGE_FORWARDS' });
    }

    function pageBackwards() {
        dispatch({ type: 'PAGE_BACKWARDS' });
    }

    console.log(currentWindow, furthestWindow);

    const paddingTop = currentWindow[0] * 120;
    const paddingBottom = (furthestWindow[0] - currentWindow[0]) * 120;

    return (
        <div style={{
            paddingTop,
            paddingBottom
        }}>
            <Sentinel name="The top sentinel" callback={pageBackwards} />
            <Row>
                {cardData.slice(...currentWindow).map((card, idx) => (
                    <Card 
                        key={idx}
                        id={card.id}
                        description={card.description}
                    />
                ))}
            </Row>
            <Sentinel name="The bottom sentinel" callback={pageForwards} />
        </div>
    );
}

VirtualList.propTypes = {

};