import React, { 
    useState,
    useEffect,
    useLayoutEffect,
    useReducer,
    Component 
} from 'react';
import styled from 'styled-components';
import { Row } from '../components/Layout';
import { useInView } from 'react-intersection-observer';
import usePrevious from '../components/usePrevious';


function getCardData(pageNumber) {
    return Array.from({ length: 20 })
                .map((el, idx) => {
                    const num = pageNumber * 20 + idx + 1;
                    return {
                        id: num,
                        description: `This is card ${idx + 1} from page ${pageNumber}, it is card ${num} overall`
                    };
                });
}

const StyledCard = styled.div`
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #eee;
    border-radius: 3px;
    display: flex;
    align-items: center;
`;

const CardIcon = styled.div`
    width: 60px;
    height: 60px;
    background: #222;
    border-radius: 3px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.75rem;
    color: #fff;
`;

const CardText = styled.p`
    font-family: sans-serif;
    color: #222;
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 0;
`;

function Card({ id, description }) {
    return (
        <StyledCard>
            <CardIcon>{id}</CardIcon>
            <CardText>{description}</CardText>
        </StyledCard>
    );
}

class Sentinel extends Component {

    containerRef = React.createRef();

    observerCallback = (entries) => {
        //console.log(entries);
        if (entries[0].isIntersecting && this.props.currentPage < 4) {
            //console.log('Callback would get called');
            this.props.getNextPage()
        }
    }

    observer = new IntersectionObserver(this.observerCallback);

    componentDidMount() {
        if (this.containerRef.current) {
            this.observer.observe(this.containerRef.current);
        }
    }

    render() {
        return (
            <div ref={this.containerRef}></div>
        );
    }
}

function SentinelFn({ isLoading, getNextPage }) {
    const [ ref, inView, entry ] = useInView({
        rootMargin: '0px 0px 200px 0px'
    });

    //const [ ref, inView, entry ] = useInView();

    const prevInView = usePrevious(inView);

    // Call the getNextPage function, only if inView is true, prevInView is falsey, and isLoading
    // is false.  
    useEffect(() => {
        //console.log('SentinelFn effect ran here, but it would not have called getNextPage');
        console.log(`
            inView: ${inView}
            prevInView: ${prevInView}
            isLoading: ${isLoading}
        `)
        if (inView && !prevInView && !isLoading) {
            // console.log(`
            //     inView: ${inView}
            //     prevInView: ${prevInView}
            //     isLoading: ${isLoading}
            // `)
            console.log('SentinelFn would have called getNextPage here');
            getNextPage();
        }
    }, [ inView, prevInView, isLoading, getNextPage ])

    return (
        <div ref={ref}></div>
    );
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
                cardData: [ ...state.cardData, ...action.payload.cardData ],
                currentPage: state.currentPage + 1,
                isLoading: false
            };
    }
}

export default function Scrolltest({ initialCards }) {

    const [ state, dispatch ] = useReducer(reducer, 
        {
            cardData: initialCards,
            currentPage: 0,
            isLoading: false
        }
    );

    const { cardData, currentPage, isLoading } = state;

    // const [ cardData, setCardData ] = useState(initialCards);
    // const [ currentPage, setPage ] = useState(0);
    // const [ isLoading, setIsLoading ] = useState(false);

    const [ showSentinel, setShowSentinel ] = useState(false);

    useEffect(() => {
        setShowSentinel(true);
    }, []);

    async function getNextPage() {
        if (currentPage >= 4) return;
        //console.log(`getNextPage called for page ${currentPage}`);
        //setIsLoading(true);
        dispatch({ type: 'FETCH_DATA_REQUEST' })
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const newCardData = getCardData(currentPage + 1);
        dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: { cardData: newCardData }
        });
        // setCardData(prev => ([ ...prev, ...nextPageCards ]));
        // setPage(prev => prev + 1);
        // setIsLoading(false);
    }

    return (
        <div>
            <Row>
                {cardData.map(card => (
                    <Card 
                        key={card.id} 
                        id={card.id} 
                        description={card.description}
                    />
                ))}
                <SentinelFn 
                    isLoading={isLoading}
                    getNextPage={getNextPage}
                />
                {isLoading && <p>Loading more data...</p>}
            </Row>
        </div>
    )
}

/*
{showSentinel && <Sentinel 
                    getNextPage={getNextPage}
                    currentPage={currentPage}
                />}

*/

Scrolltest.getInitialProps = async () => {
    return {
        initialCards: getCardData(0)
    }
}