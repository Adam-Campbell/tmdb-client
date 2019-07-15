import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import { getUsersRatings } from '../../reducers/user';
import 'react-vis/dist/style.css';
import { 
    XYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    VerticalGridLines,
    LineSeries,
    VerticalBarSeries,
    MarkSeries,
    ArcSeries
} from 'react-vis';

const Container = styled.div`
    width: calc(100% - 40px);
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    border: solid pink 1px;
`;

const Title = styled.h1`
    font-family: sans-serif;
    color: #222;
    font-weight: 700;
    font-size: 2.5rem;
`;

function Me(props) {
    return (
        <Container>
            <Title>This is the user profile route</Title>
            <XYPlot
                width={300}
                height={120}
            >
                <HorizontalGridLines 
                 
                />
                <VerticalBarSeries
                    color="#43cbe8" 
                    data={props.ratingsChartData}/>
                <XAxis 
                    style={{ fontFamily: 'sans-serif' }} 
                    tickValues={[1,2,3,4,5,6,7,8,9,10]}
                />
                <YAxis
                    style={{ fontFamily: 'sans-serif' }} 
                    tickFormat={(value, index, scale, tickTotal) => {
                        return Math.round(value) === value ? value : "";
                    }}
                />
            </XYPlot>
            <XYPlot 
                width={300} 
                height={300} 
                xDomain={[-5,5]}
                yDomain={[-5,5]}
            >
                <ArcSeries 
                    center={{ x: 0, y: 0 }}
                    colorType="literal"
                    data={[
                        { angle0: 0, angle: Math.PI / 4 }
                    ]}
                />        
            </XYPlot>
        </Container>
    );
}

Me.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

// color="#43cbe8" 

function formatRatingsData({ movies, shows }) {
    const chartData = Array.from({ length: 10 })
                           .map((el, index) => ({ x: index + 1, y: 0 }));
    for (let ratingObj of [ ...movies, ...shows ]) {
        chartData[ratingObj.rating - 1].y++;
    }
    return chartData;
}

function mapState(state) {
    return {
        ratingsChartData: formatRatingsData( getUsersRatings(state) )
    }
}

export default connect(mapState)(Me);