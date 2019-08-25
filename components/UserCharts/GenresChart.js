import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {   
    VictoryPie,
    VictoryLegend,
    VictoryContainer 
} from 'victory';
import { connect } from 'react-redux';
import { getUsersRatings, getUsersFavourites } from '../../reducers/user';
import customTheme from './customTheme';
import { getPieData } from './utils';

const GenresChartContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    @media (min-width: 350px) {
        flex-direction: row;
    }
`;

const OuterContainer = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(2, 0)};
    max-width: 400px;
`;

const ChartTitle = styled.h3`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

function GenresChart({ rated, favourites }) {

    const pieData = useMemo(() => {
        return getPieData([
            ...rated.movies,
            ...rated.shows,
            ...favourites.movies,
            ...favourites.shows
        ]);
    }, [ rated, favourites ]);

    const legendData = useMemo(() => {
        return pieData.map(data => ({ name: data.genre }));
    }, [ pieData ]);
    
    return (
        <OuterContainer>
            <ChartTitle>Most Watched Genres</ChartTitle>
            <GenresChartContainer>
                <VictoryPie 
                    data={pieData}
                    x="genre"
                    y="frequency"
                    innerRadius={80}
                    padAngle={3}
                    labels={d => ''}
                    theme={customTheme}
                    containerComponent={<VictoryContainer containerId="genres-pie-container"/>}
                />
                <VictoryLegend 
                    x={35} 
                    y={35}
                    width={300}
                    centerTitle
                    orientation="vertical"
                    gutter={20}
                    theme={customTheme}
                    style={{ 
                        title: { fontSize: 24 }, 
                        labels: { fontSize: 18 },

                    }}
                    data={legendData}
                    containerComponent={<VictoryContainer containerId="genres-legend-container"/>}
                />
            </GenresChartContainer>
        </OuterContainer>
    );
}

function mapState(state) {
    return {
        rated: getUsersRatings(state),
        favourites: getUsersFavourites(state)
    }
}

export default connect(mapState)(GenresChart);
