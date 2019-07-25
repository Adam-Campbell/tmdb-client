import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    VictoryChart, 
    VictoryArea, 
    VictoryAxis, 
    VictoryContainer,
    VictoryLabel 
} from 'victory';
import customTheme from '../UserCharts/customTheme';
import { getSeasonData } from '../../reducers/seasonReducer';
import { text } from '../../utils';

const ChartContainer = styled.div`
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const ChartTitle = styled.h2`
    ${text('heading')}
    margin: 0;
`;


function SeasonRatingsChart({ episodes }) {

    const chartData = useMemo(() => {
        return episodes.map(e => ({
            episodeNumber: e.episode_number,
            name: e.name,
            averageRating: e.vote_average
        }));
    }, [ episodes ]);

    const scoreDomain = useMemo(() => {
        const sorted = chartData.sort((a,b) => a.averageRating - b.averageRating);
        const min = Math.floor(sorted[0].averageRating);
        const max = Math.ceil(sorted[sorted.length-1].averageRating);
        return [ min, max ];
    }, [ chartData ]);

    const scoreDomainArray = useMemo(() => {
        const domainSize = scoreDomain[1] - scoreDomain[0] + 1;
        return Array.from({ length: domainSize }).map((el, idx) => scoreDomain[0] + idx);
    }, [ scoreDomain ]);

    //return null;

    return (
        <ChartContainer>
            <ChartTitle>Episode Rating Trends</ChartTitle>
            <VictoryChart
                theme={customTheme}
                height={150}
                padding={{ left: 40, bottom: 25, top: 20 }}
                containerComponent={<VictoryContainer 
                    containerId="season-ratings-chart-container"
                />}
            >
                <VictoryAxis 
                    
                />
                <VictoryAxis 
                    dependentAxis
                    tickValues={scoreDomainArray}
                    label="Average Rating"
                    style={{ 
                        ticks: { stroke: '#222' },
                        tickLabels: { fill: '#222', fontSize: 12, padding: 5 },
                        axisLabel: { fontSize: 12, padding: 20 }
                    }}
                    axisLabelComponent={<VictoryLabel dy={-4} />}
                    height={200}
                />
                <VictoryArea 
                    data={chartData}
                    x="episodeNumber"
                    y="averageRating"
                    domain={{ x: [1, episodes.length], y: scoreDomain }}
                    style={{ data: { fill: '#43cbe8' } }}
                    interpolation="natural"
                />
            </VictoryChart>
        </ChartContainer>
    );
}

function mapState(state) {
    const s = getSeasonData(state);
    return {
        episodes: s.episodes
    }
}

export const ConnectedSeasonRatingsChart = connect(mapState)(SeasonRatingsChart);
