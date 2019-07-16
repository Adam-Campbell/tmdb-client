import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryPie } from 'victory';
import { connect } from 'react-redux';
import { getUsersRatings, getUsersFavourites } from '../../reducers/user';

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


const GenresChartContainer = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 250px;
    border: solid green 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

/*

    Take all of the movie/tv items and concatenate them into one array.

    Store the length of this array - will prob need it later.

    On each entity the array of genre ids is stored under the key genre_ids. 

    Reduce the array down to an object where each key is one of the ids, and the corresponding value
    is the number of times that ids appears. 

    Create an array from this object, where each element in this array is an object of the shape
    { genreId, frequency }.

    Sort the array in descending order of frequency.

    Our final data structure will be an array consisting of the top three results from this array,
    and then the total of every result from the array which will be combined into an 'other' category. 

    So, using slice, get the subsection of the array starting at the fourth element, and then reduce this
    down to its total. 

    Finally, return our array consisting of objects for the top three genres plus the 'others' object.

*/


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
    const topGenres = sorted.slice(0, threshold);
    const totalOthers = sorted.slice(threshold).reduce((total, el) => (total + el.frequency), 0);
    return [
        ...topGenres,
        { genre: 'Others', frequency: totalOthers }
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

    //console.log(pieData);
    return (
        <GenresChartContainer>
            <VictoryPie 
                data={pieData}
                x="genre"
                y="frequency"
                innerRadius={100}
            />
        </GenresChartContainer>
    );
}

function mapState(state) {
    return {
        rated: getUsersRatings(state),
        favourites: getUsersFavourites(state)
    }
}

export default connect(mapState)(GenresChart);