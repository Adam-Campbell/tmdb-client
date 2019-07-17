import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsersRatings } from '../../reducers/user';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryContainer } from 'victory';
import { getNumericTicks } from './utils';
import { text } from '../../utils';
import customTheme from './customTheme';

const RatingsChartContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ChartTitle = styled.h3`
    ${text('heading', { fontSize: '1rem' })}
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
    }
    
`;

const Fieldset = styled.fieldset`
    border: none;
    padding: 0;
`;

const Legend = styled.legend`
    ${text('body', { fontWeight: 700, fontSize: '0.85rem' })}
    opacity: 0;
    position: absolute;
    left: -9999px;
`;

const RadioButtonsContainer = styled.div`
    width: 100%;
    display: flex;
`;

const RadioButton = styled.input`
    opacity: 0;
    position: absolute;
    left: -9999px;
`;

const RadioButtonLabel = styled.label`
    ${text('body', { fontSize: '0.85rem' })}
    padding: 5px;
    background: #eee;
    border-radius: 3px;
    margin-left: 3px;
    margin-right: 3px;
    cursor: pointer;
    transition: background ease-out 0.2s;
    flex-grow: 1;
    text-align: center;
    ${RadioButton}:checked + & {
        background: #ddd;
        font-weight: 700;
    }
    &:hover {
        background: #e6e6e6;
    }
    &:first-of-type {
        margin-left: 0;
    }
    &:last-of-type {
        margin-right: 0;
    }
`;

const filterData = [
    { name: 'All', value: 'all', id: 'media-type-all' },
    { name: 'Movie', value: 'movie', id: 'media-type-movie' },
    { name: 'TV', value: 'tv', id: 'media-type-tv' }
];

function convertToChartData(ratingsData) {
    const chartData = Array.from({ length: 10 })
                           .map((el, index) => ({ rating: index + 1, frequency: 0 }));
    for (let ratingObj of ratingsData) {
        chartData[ratingObj.rating - 1].frequency++;
    }
    return chartData;
}

function RatingsChart({ ratings }) {

    const allRatingsData = useMemo(() => {
        return convertToChartData([ ...ratings.movies, ...ratings.shows ])
    }, [ ratings.movies, ratings.shows ]);

    const movieRatingsData = useMemo(() => {
        return convertToChartData([ ...ratings.movies ])
    }, [ ratings.movies ]);

    const showRatingsData = useMemo(() => {
        return convertToChartData([ ...ratings.shows ])
    }, [ ratings.shows ]);

    const yAxisTickValues = useMemo(() => {
        const maxFreq = allRatingsData.sort((a,b) => b.frequency - a.frequency)[0].frequency;
        return getNumericTicks(maxFreq, 4);
    }, [ allRatingsData ]);

    //const [ currentData, setCurrentData ] = useState(allRatingsData);
    const [ currentlyShowing, setShowing ] = useState('all');

    let data;
    switch (currentlyShowing) {
        case 'movie':
            data = movieRatingsData;
            break;
        case 'tv':
            data = showRatingsData;
            break;
        case 'all':
            data = allRatingsData;
            break;
    }

    return (
        <RatingsChartContainer>
            <TitleContainer>
                <ChartTitle>Your Ratings</ChartTitle>
                <Fieldset>
                    <Legend>Filter Ratings</Legend>
                    <RadioButtonsContainer>
                        {filterData.map(d => (
                            <React.Fragment key={d.id}>
                                <RadioButton 
                                    type="radio"
                                    id={d.id}
                                    name="filter"
                                    value={d.value}
                                    checked={currentlyShowing === d.value}
                                    onChange={e => setShowing(d.value)}
                                />
                                <RadioButtonLabel
                                    htmlFor={d.id}
                                >{d.name}</RadioButtonLabel>
                            </React.Fragment>
                        ))}
                    </RadioButtonsContainer>
                </Fieldset>
            </TitleContainer>
            <VictoryChart
                // stops the bars in the chart from overlapping the axes
                domainPadding={20}
                theme={customTheme}
                animate={{ duration: 400, easing: 'circle' }}
                height={180}
                containerComponent={<VictoryContainer 
                    containerId="ratings-bar-container"
                />}
            >
                <VictoryAxis 
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    
                />
                <VictoryAxis 
                    dependentAxis
                    tickValues={yAxisTickValues}
                />
                    <VictoryBar 
                        data={data}
                        x="rating"
                        y="frequency"
                        
                        barRatio={0.8}
                    />  
            </VictoryChart>
        </RatingsChartContainer>
    );
}

function mapState(state) {
    return {
        ratings: getUsersRatings(state)
    }
}

export default connect(mapState)(RatingsChart);