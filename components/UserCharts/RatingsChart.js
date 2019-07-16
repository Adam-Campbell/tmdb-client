import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsersRatings } from '../../reducers/user';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import { getNumericTicks } from './utils';
import { text } from '../../utils';

const RatingsChartContainer = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    border: solid green 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Fieldset = styled.fieldset`
    border: none;
    padding-left: 0;
    padding-right: 0;
`;

const Legend = styled.legend`
    ${text('body', { fontWeight: 700 })}
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
    padding: 10px;
    background: #eee;
    border-radius: 3px;
    margin-left: 5px;
    margin-right: 5px;
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
            <VictoryChart
                // stops the bars in the chart from overlapping the axes
                domainPadding={20}
                theme={VictoryTheme.material}
                animate={{ duration: 400, easing: 'circle' }}
                height={200}
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
                        style={{ data: { fill: '#43cbe8' } }}
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