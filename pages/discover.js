import React, { Component, useState } from 'react';
import styled from 'styled-components';
import MultiThumbSlider from '../components/MultiThumbSlider';
import RangeSelect from '../components/RangeSelect';
import AutocompleteTest from '../components/AutocompleteTest';
import ControlledSelect from '../components/ControlledSelect';
import ScrollList from '../components/ScrollList';
import ScrollListWithBuffer from '../components/ScrollListWithBuffer';
import ListBox from '../components/ListBox';
import Router from 'next/router';
import ComboBox from '../components/ComboBox';

// const osortByOptions = [
//     'popularity_ascending',
//     'popularity_descending',
//     'release_date_ascending',
//     'release_date_descending',
//     'vote_average_ascending',
//     'vote_average_descending',
// ];

const sortByOptions = [
    { name: 'Popularity Ascending', value: 'popularity.asc' },
    { name: 'Popularity Descending', value: 'popularity.desc' },
    { name: 'Release Date Ascending', value: 'release_date.asc' },
    { name: 'Release Date Descending', value: 'release_date.desc' },
    { name: 'Vote Average Ascending', value: 'vote_average.asc' },
    { name: 'Vote Average Descending', value: 'vote_average.desc' },
];

const movieGenres = [
    { name: 'Action', id: 28 },
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
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'Western', id: 37 }
];

const TVGenres = [
    { name: 'Action & Adventure', id: 10759 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Kids', id: 10762 },
    { name: 'Mystery', id: 9648 },
    { name: 'News', id: 10763 },
    { name: 'Reality', id: 10764 },
    { name: 'Sci-Fi & Fantasy', id: 10765 },
    { name: 'Soap', id: 10766 },
    { name: 'Talk', id: 10767 },
    { name: 'War & Politics', id: 10768 },
    { name: 'Western', id: 37 }
];

const mediaTypes = [
    { name: 'TV', value: 'tv' },
    { name: 'Movies', value: 'movies' }
]

const DropdownContainer = styled.div`
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
`;


function processQuery(query) {
    const params = {
        release_gte: '1900',
        release_lte: '2019',
        score_gte: '0',
        score_lte: '10',
        sort_by: 'popularity.desc',
        with_genres: '',
        ...query
    };
    return {
        releaseValues: [
            parseInt(params.release_gte),
            parseInt(params.release_lte)
        ],
        scoreValues: [
            parseFloat(params.score_gte),
            parseFloat(params.score_lte)
        ],
        sortBy: params.sort_by,
        withGenres: genreIdsToObjects(params.with_genres)
    };
}

function genreObjectsToIds(objectsArray) {
    const converted = objectsArray.map(obj => obj.id).join(',');
    console.log(converted);
    return converted;
}

function genreIdsToObjects(idsString) {
    if (idsString === '') {
        return []
    }
    return decodeURIComponent(idsString).split(',')
                    .map(str => movieGenres.find(movie => movie.id === parseInt(str)));
}


const ComboBoxContainer = styled.div`
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
`;


class Discover extends Component {

    state = {
        releaseValues: this.props.releaseValues,
        scoreValues: this.props.scoreValues,
        sortBy: this.props.sortBy,
        withGenres: []
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.queryString === this.props.queryString) return;
        this.setState({
            releaseValues: this.props.releaseValues,
            scoreValues: this.props.scoreValues,
            sortBy: this.props.sortBy,
            withGenres: this.props.withGenres
        }); 
    }

    updateGenres = (newGenresSelection) => {
        this.setState(prev => ({
            ...prev, 
            withGenres: newGenresSelection
        }));
    }

    updateValue = (key) => (value) => {
        this.setState(prev => ({
            ...prev,
            [key]: value
        }), this.handleRedirect);
    }

    handleRedirect = () => {
        const { releaseValues, scoreValues, sortBy, withGenres } = this.state;
        let queryObject = {
            score_gte: scoreValues[0],
            score_lte: scoreValues[1],
            release_gte: releaseValues[0],
            release_lte: releaseValues[1],
            sort_by: sortBy,
        };
        if (withGenres.length) {
            queryObject.with_genres = genreObjectsToIds(withGenres)
        }
        Router.push({
            pathname: '/discover',
            query: queryObject
        });
    }

    render() {

        const { releaseValues, scoreValues, sortBy, withGenres } = this.state;

        /*
            <select>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
                <option value="option4">Option Four</option>
            </select>
        */

        return (
            <div style={{ padding: '50px', minHeight: '1600px' }}>
                <h1>This is the Discover page</h1>
                <div style={{ width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <RangeSelect 
                        domain={[0, 10]}
                        stepSize={0.1}
                        initialValues={[0, 10]}
                        numTicks={10}
                        contentDescription="Show me movies that scored"
                        isControlled={true}
                        externalValue={scoreValues}
                        setExternalValue={this.updateValue('scoreValues')}
                    />
                    <RangeSelect 
                        domain={[1900, 2019]}
                        stepSize={1}
                        initialValues={[1900, 2019]}
                        numTicks={5}
                        contentDescription="Show me movies made"
                        isControlled={true}
                        externalValue={releaseValues}
                        setExternalValue={this.updateValue('releaseValues')}
                    />
                </div>
                <DropdownContainer>
                    <ListBox 
                        items={sortByOptions}
                        currentValue={sortBy}
                        setValue={this.updateValue('sortBy')}
                        shouldBuffer={true}
                        onChange={(val) => console.log(val)}
                    />
                </DropdownContainer>
                <ComboBoxContainer>
                    <ComboBox 
                        items={movieGenres}
                        currentSelection={withGenres}
                        setSelection={this.updateValue('withGenres')}
                    />
                </ComboBoxContainer>
            </div>
        );
    }
}

Discover.getInitialProps = async ({ query }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        ...processQuery(query),
        queryString: query
    }
}

export default Discover;


const _Discover = (props) => {

    const [ selectValue, setSelectValue ] = useState(listData[1]);

    function pushWithScore(values) {
        Router.push({
            pathname: '/discover',
            query: {
                score_gte: values[0],
                score_lte: values[1],
                release_gte: props.releaseValues[0],
                release_lte: props.releaseValues[1],
                sort_by: props.sortBy
            }
        });
    }

    function pushWithRelease(values) {
        Router.push({
            pathname: '/discover',
            query: {
                score_gte: props.scoreValues[0],
                score_lte: props.scoreValues[1],
                release_gte: values[0],
                release_lte: values[1],
                sort_by: props.sortBy
            }
        });
    }

    function pushWithSortBy(value) {
        Router.push({
            pathname: '/discover',
            query: {
                score_gte: props.scoreValues[0],
                score_lte: props.scoreValues[1],
                release_gte: props.releaseValues[0],
                release_lte: props.releaseValues[1],
                sort_by: value
            }
        });
    }

    return (
        <div style={{ padding: '50px', minHeight: '1600px' }}>
            <h1>This is the Discover page</h1>
            <div style={{ width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <RangeSelect 
                    domain={[0, 10]}
                    stepSize={0.1}
                    initialValues={[0, 10]}
                    numTicks={10}
                    contentDescription="Show me movies that scored"
                    isControlled={true}
                    externalValue={props.scoreValues}
                    setExternalValue={pushWithScore}
                />
                <RangeSelect 
                    domain={[1900, 2019]}
                    stepSize={1}
                    initialValues={[1900, 2019]}
                    numTicks={5}
                    contentDescription="Show me movies made"
                    isControlled={true}
                    externalValue={props.releaseValues}
                    setExternalValue={pushWithRelease}
                />
            </div>
            <DropdownContainer>
                <ListBox 
                    items={sortByOptions}
                    currentValue={props.sortBy}
                    setValue={pushWithSortBy}
                    shouldBuffer={true}
                    onChange={(val) => console.log(val)}
                />
            </DropdownContainer>
        </div>
    );
}
