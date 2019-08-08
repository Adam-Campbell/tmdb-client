import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
    VictoryBar, 
    VictoryChart, 
    VictoryAxis, 
    VictoryTheme, 
    VictoryStack, 
    VictoryPie,
    VictoryLegend,
    VictoryContainer 
} from 'victory';
import { connect } from 'react-redux';
import { getUsersRatings, getUsersFavourites } from '../../reducers/user';
import customTheme from './customTheme';
import { text } from '../../utils';

const genres = [
    { name: 'Action', id: 28 },
    { name: 'Action & Adventure', id: 10759 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Kids', id: 10762 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'News', id: 10763 },
    { name: 'Reality', id: 10764 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'Sci-Fi & Fantasy', id: 10765 },
    { name: 'Soap', id: 10766 },
    { name: 'Talk', id: 10767 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'War & Politics', id: 10768 },
    { name: 'Western', id: 37 }
];

const genresMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
}, {});

const colorsArr = [
    '#dc1f3b',
    '#43cbe8',
    '#6ee843',
    '#f58a0b',
    '#1a435d'
];


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


function getPieData(entities) {
    // keeping this for later
    const len = entities.length;
    const threshold = 4;
    
    // Created an object where each key is a genre_id and the corresponding value is the number of times
    // that genre_id appears.
    const summed = entities.reduce((acc, entity) => {
        for (let genre of entity.genre_ids) {
            if (acc[genre]) {
                acc[genre]++;
            } else {
                acc[genre] = 1;
            }
        } 
        return acc;     
    }, {});

    
    // Creates an array where each element is an object with a 'genre' key equal to the name corrsponding to a
    // genre_id, and a 'frequency' key holding the number of times that genre_id appears. 
    let genresArr = [];
    for (let key in summed) {
        genresArr.push({
            genre: genresMap[key],
            frequency: summed[key]
        });
    }

    // Take every genre except for the top `threshold` (according to frequency) and combine them all into
    // an 'Other' category, then return the top `threshold` genres and the 'Other' category.
    const sorted = genresArr.sort((a,b) => b.frequency - a.frequency);
    const topGenres = sorted.slice(0, threshold)
                            .map((el, idx) => ({ ...el, fill: colorsArr[idx] }));
    const totalOthers = sorted.slice(threshold).reduce((total, el) => (total + el.frequency), 0);
    return [
        ...topGenres,
        { genre: 'Others', frequency: totalOthers, fill: colorsArr[4] }
    ];

}


function GenresChart({ rated, favourites }) {
    const pieData = useMemo(() => {
        const entities = [
            ...rated.movies,
            ...rated.shows,
            ...favourites.movies,
            ...favourites.shows
        ];
        const r = getPieData(entities);
        return r;
    }, [ rated, favourites ]);

    const legendData = pieData.map((data, idx) => ({
        name: data.genre,
        // symbol: { fill: 
        //     colorsArr[idx] 
        // }
    }));
    //console.log(pieData);

    // old pie chart fill style:
    // style={{ data: { fill: d => d.fill } }}
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
                        border: { stroke: "#222" }, 
                        title: {fontSize: 24, fill: '#222' }, 
                        labels: { fill: '#222', fontSize: 18 },

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