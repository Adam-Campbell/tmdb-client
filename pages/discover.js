import React, { Component, useState } from 'react';
import styled from 'styled-components';
import RangeSelect from '../components/RangeSelect';
import ListBox from '../components/ListBox';
import Router from 'next/router';
import ComboBox from '../components/ComboBox';
import ListViewHeader from '../components/ListViewHeader';
import MediaListView from '../components/MediaListView';
import { getDiscoverResults } from '../clientApi';
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
import { MediaCard } from '../components/Cards';
import { Button } from '../components/Buttons';
import { SlidersH, Times } from 'styled-icons/fa-solid';

const PageWrapper = styled.div`
    overflow-x: hidden;
`;

const ContentWrapper = styled(Row)`
    display: flex;
`;

const ControlsCol = styled.div`
    display: ${({ isShowingFilters }) => isShowingFilters ? 'block' : 'none'};
    width: 280px;
    margin-right: ${({ theme, isShowingFilters }) => isShowingFilters ? theme.getSpacing(4) : 0};
    flex-shrink: 0;
    padding-top: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 340px) {
        width: 300px;
    }
`;

const ResultsCol = styled.div`
    width: 100%;
    flex-shrink: 0;
`;

const SliderContainer = styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

const InputContainer = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const ComboBoxContainer = styled.div`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const FiltersIcon = styled(SlidersH)`
    width: 16px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

const CloseIcon = styled(Times)`
    width: 11px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;

class Discover extends Component {

    state = {
        releaseValues: this.props.releaseValues,
        scoreValues: this.props.scoreValues,
        sortBy: this.props.sortBy,
        withGenres: this.props.withGenres,
        mediaType: this.props.mediaType, 
        isShowingFilters: false
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

    toggleFilters = () => {
        this.setState(prevState => ({
            isShowingFilters: !prevState.isShowingFilters
        }));
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

        const { releaseValues, scoreValues, sortBy, withGenres, mediaType, isShowingFilters } = this.state;
        const { movieGenres, TVGenres, results } = this.props;

        const stableSortBy = sortByOptions.find(el => el.value === sortBy.value);
        const stableMediaType = mediaTypes.find(el => el.value === mediaType.value);

        return (
            <PageWrapper>
                <ListViewHeader title="Discover">
                    <Button onClick={this.toggleFilters}>
                        {isShowingFilters ? 'Hide Filters' : 'Show Filters'}
                        {isShowingFilters ? <CloseIcon /> : <FiltersIcon />}
                    </Button>
                </ListViewHeader>
                <ContentWrapper>
                    <ControlsCol isShowingFilters={isShowingFilters}>
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
                        <InputContainer>
                            <ListBox 
                                items={sortByOptions}
                                currentValue={stableSortBy}
                                setValue={this.updateValue('sortBy')}
                                shouldBuffer={true}
                                shouldInlineLabel={false}
                                labelText="Sort by:"
                            />
                        </InputContainer>
                        <InputContainer>
                            <ListBox 
                                items={mediaTypes}
                                currentValue={stableMediaType}
                                setValue={this.updateValue('mediaType')}
                                shouldBuffer={true}
                                shouldInlineLabel={false}
                                labelText="Media type:"
                            />
                        </InputContainer>
                        <ComboBoxContainer>
                            <ComboBox 
                                items={mediaType.value === 'movies' ? movieGenres : TVGenres}
                                currentSelection={withGenres}
                                setSelection={this.updateValue('withGenres')}
                            />
                        </ComboBoxContainer>
                    </ControlsCol>
                    <ResultsCol>
                        {results.map(item => (
                            <MediaCard 
                                key={item.id}
                                id={item.id}
                                title={item.title || item.name}
                                releaseDate={item.release_date || item.first_air_date}
                                averageRating={item.vote_average}
                                backdropPath={item.backdrop_path}
                                posterPath={item.poster_path}
                                overview={item.overview}
                                urlSubpath={mediaType.value === 'movies' ? '/movie' : '/show'}
                                isInline={true}
                            /> 
                        ))}
                    </ResultsCol>
                </ContentWrapper>
            </PageWrapper>
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
