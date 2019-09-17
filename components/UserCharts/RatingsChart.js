import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsersRatings } from '../../reducers/user';
import { 
    VictoryBar, 
    VictoryChart, 
    VictoryAxis,  
    VictoryContainer 
} from 'victory';
import { getNumericTicks, convertToChartData } from './utils';
import customTheme from './customTheme';
import {
    RatingsChartContainer,
    ChartTitle,
    TitleContainer,
    Fieldset,
    Legend,
    RadioButtonsContainer,
    RadioButton,
    RadioButtonLabel
} from './ratingsChartElements';

const filterData = [
    { name: 'All', value: 'all', id: 'media-type-all' },
    { name: 'Movie', value: 'movie', id: 'media-type-movie' },
    { name: 'TV', value: 'tv', id: 'media-type-tv' }
];

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
