import React, { useState, useMemo } from 'react';
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
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import RatingsChart from '../../components/UserCharts/RatingsChart';
import GenresChart from '../../components/UserCharts/GenresChart';

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

const BarChartContainer = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 350px;
    border: solid green 2px;
`;

// function Me({ ratings }) {

//     const allRatingsData = useMemo(() => {
//         return convertToChartData([ ...ratings.movies, ...ratings.shows ])
//     }, [ ratings.movies, ratings.shows ]);

//     const movieRatingsData = useMemo(() => {
//         return convertToChartData([ ...ratings.movies ])
//     }, [ ratings.movies ]);

//     const showRatingsData = useMemo(() => {
//         return convertToChartData([ ...ratings.shows ])
//     }, [ ratings.shows ]);

//     const yAxisTickValues = useMemo(() => {
//         const maxFreq = allRatingsData.sort((a,b) => b.frequency - a.frequency)[0].frequency;
//         //return Array.from({ length: maxFreq }).map((el, index) => index + 1);
//         const interval = Math.ceil(maxFreq / 4);
//         const numOfIntervals = Math.ceil(maxFreq / interval);
//         return Array.from({ length: numOfIntervals }).map((el, idx) => {
//   	        return (idx+1) * interval;
//         });
//     }, [ allRatingsData ]);

//     const [ currentData, setCurrentData ] = useState(allRatingsData);
    

//     return (
//         <Container>
//             <Title>This is the user profile route</Title>
//             <button onClick={() => setCurrentData(movieRatingsData)}>Movie ratings</button>
//             <button onClick={() => setCurrentData(showRatingsData)}>Show ratings</button>
//             <button onClick={() => setCurrentData(allRatingsData)}>All ratings</button>
//             <BarChartContainer>
//                 <VictoryChart
//                     // stops the bars in the chart from overlapping the axes
//                     domainPadding={20}
//                     theme={VictoryTheme.material}
//                     animate={{ duration: 1000, easing: 'bounce' }}
//                     height={200}
//                 >
//                     <VictoryAxis 
//                         tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        
//                     />
//                     <VictoryAxis 
//                         dependentAxis
//                         tickValues={yAxisTickValues}
//                     />
//                         <VictoryBar 
//                             data={currentData}
//                             x="rating"
//                             y="frequency"
//                         />  
//                 </VictoryChart>
//             </BarChartContainer>
//         </Container>
//     );
// }

function Me(props) {
    return (
        <Container>
            <Title>This is the user profile</Title>
            
            <GenresChart />
        </Container>
    );
}
// <RatingsChart />
// tickFormat={(tick) => Math.round(tick) === tick ? tick : ''}

Me.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

// color="#43cbe8" 

function convertToChartData(ratingsData) {
    const chartData = Array.from({ length: 10 })
                           .map((el, index) => ({ rating: index + 1, frequency: 0 }));
    for (let ratingObj of ratingsData) {
        chartData[ratingObj.rating - 1].frequency++;
    }
    return chartData;
}



// function formatRatingsData({ movies, shows }) {
//     const chartData = Array.from({ length: 10 })
//                            .map((el, index) => ({ x: index + 1, y: 0 }));
//     for (let ratingObj of [ ...movies, ...shows ]) {
//         chartData[ratingObj.rating - 1].y++;
//     }
//     return chartData;
// }

function mapState(state) {
    return {
        //ratingsChartData: formatRatingsData( getUsersRatings(state) )
        ratings: getUsersRatings(state)
    }
}

export default connect(mapState)(Me);



/*

function Me(props) {
    return (
        <Container>
            <Title>This is the user profile route</Title>
            <BarChartContainer>
                <VictoryChart
                    // stops the bars in the chart from overlapping the axes
                    domainPadding={20}
                    theme={VictoryTheme.material}
                    animate={{ duration: 1000, easing: 'bounce' }}
                >
                    <VictoryAxis 
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    />
                    <VictoryAxis 
                        dependentAxis
                        tickFormat={x => `$${x / 1000}k`}
                    />
                    <VictoryStack colorScale="warm" >
                        <VictoryBar 
                            data={data2012}
                            x="quarter"
                            y="earnings"
                        />
                        <VictoryBar 
                            data={data2013}
                            x="quarter"
                            y="earnings"
                        />
                        <VictoryBar 
                            data={data2014}
                            x="quarter"
                            y="earnings"
                        />
                        <VictoryBar 
                            data={data2015}
                            x="quarter"
                            y="earnings"
                        />
                    </VictoryStack>
                </VictoryChart>
            </BarChartContainer>
        </Container>
    );
}





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


*/