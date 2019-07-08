import React, { Component, useState } from 'react';
import styled from 'styled-components';
import RangeSelect from '../components/RangeSelect';
import ListBox from '../components/ListBox';
import Router from 'next/router';
import ComboBox from '../components/ComboBox';
import MediaListView from '../components/MediaListView';
import { getDiscoverResults } from '../Api';
import { Row } from '../components/Layout';
import {
    sortByOptions,
    movieGenres,
    TVGenres,
    mediaTypes,
    parseQueryParams,
    convertQueryParamsToProps,
    convertGenreObjectsToIds
} from '../utils';

const DropdownContainer = styled.div`
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
`;

const ComboBoxContainer = styled.div`
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
`;

const SliderContainer = styled.div`
    width: 100%;
    padding: 10px;
    @media(min-width: 768px) {
        width: calc(50% - 20px);
    }
`;

const SliderRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const InputContainer = styled.div`
    width: 100%;
    @media(min-width: 550px) {
        width: calc(50% - 10px);
    }
    @media(min-width: 900px) {
        width: calc(33.33333% - 10px);
    }
`;

const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;


class Discover extends Component {

    state = {
        releaseValues: this.props.releaseValues,
        scoreValues: this.props.scoreValues,
        sortBy: this.props.sortBy,
        withGenres: this.props.withGenres,
        mediaType: this.props.mediaType
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.queryString === this.props.queryString) return;
        this.setState({
            releaseValues: this.props.releaseValues,
            scoreValues: this.props.scoreValues,
            sortBy: this.props.sortBy,
            withGenres: this.props.withGenres,
            mediaType: this.props.mediaType
        }); 
    }

    updateValue = (key) => (value) => {
        this.setState(prev => ({
            ...prev,
            [key]: value
        }), this.handleRedirect);
    }

    handleRedirect = () => {
        const { releaseValues, scoreValues, sortBy, withGenres, mediaType } = this.state;
        const { movieGenres, TVGenres } = this.props;
        let queryObject = {
            score_gte: scoreValues[0],
            score_lte: scoreValues[1],
            release_gte: releaseValues[0],
            release_lte: releaseValues[1],
            //sort_by: sortBy,
            sort_by: sortBy.value,
            //media_type: mediaType
            media_type: mediaType.value
        };
        if (withGenres.length) {
            queryObject.with_genres = convertGenreObjectsToIds(
                withGenres,
                mediaType.value === 'movies' ? movieGenres : TVGenres
            );
        }
        Router.push({
            pathname: '/discover',
            query: queryObject
        });
    }

    render() {

        const { releaseValues, scoreValues, sortBy, withGenres, mediaType } = this.state;
        const { movieGenres, TVGenres, results } = this.props;

        return (
            <>
            <Row>
                <h1>This is the Discover page</h1>
                <SliderRow>
                    <SliderContainer>
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
                    </SliderContainer>
                    <SliderContainer>
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
                    </SliderContainer>
                </SliderRow>
                <InputRow>
                    <InputContainer>
                        <ListBox 
                            items={sortByOptions}
                            currentValue={sortBy}
                            setValue={this.updateValue('sortBy')}
                            shouldBuffer={true}
                            shouldInlineLabel={true}
                            labelText="Sort by:"
                        />
                    </InputContainer>
                    <InputContainer>
                        <ListBox 
                            items={mediaTypes}
                            currentValue={mediaType}
                            setValue={this.updateValue('mediaType')}
                            shouldBuffer={true}
                            shouldInlineLabel={true}
                            labelText="Media type:"
                        />
                    </InputContainer>
                    <InputContainer>
                        <ComboBox 
                            items={mediaType.value === 'movies' ? movieGenres : TVGenres}
                            currentSelection={withGenres}
                            setSelection={this.updateValue('withGenres')}
                        />
                    </InputContainer>
                </InputRow>
            </Row>
            <MediaListView 
                title="Results"
                items={results}
                urlSubpath="foo"
            />
            </>
        );
    }
}

Discover.getInitialProps = async ({ query, req }) => {
    const parsedParams = parseQueryParams(
        query,
        movieGenres,
        TVGenres
    );
    const discoverResults = await getDiscoverResults(parsedParams);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        ...convertQueryParamsToProps(parsedParams, movieGenres, TVGenres),
        queryString: query,
        results: discoverResults,
        movieGenres,
        TVGenres,
        ...serverInfo
    };
}

export default Discover;
