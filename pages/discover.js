import React, { Component } from 'react';
import Router from 'next/router';
import { getDiscoverResults } from '../clientApi';
import {
    sortByOptions,
    movieGenres,
    TVGenres,
    mediaTypes,
    parseQueryParams,
    convertQueryParamsToProps,
    convertGenreObjectsToIds
} from '../utils';
import DiscoverView from '../components/DiscoverView';
import { NextSeo } from 'next-seo';

class Discover extends Component {

    state = {
        releaseValues: this.props.releaseValues,
        scoreValues: this.props.scoreValues,
        sortBy: this.props.sortBy,
        withGenres: this.props.withGenres,
        mediaType: this.props.mediaType, 
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
        let queryObject = {
            score_gte: scoreValues[0],
            score_lte: scoreValues[1],
            release_gte: releaseValues[0],
            release_lte: releaseValues[1],
            sort_by: sortBy.value,
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
        const { results } = this.props;

        const stableSortBy = sortByOptions.find(el => el.value === sortBy.value);
        const stableMediaType = mediaTypes.find(el => el.value === mediaType.value);

        return (
            <>
                <NextSeo 
                    title="Discover" 
                    description="Discover movies and TV shows on React Movie Database, the user editable database for movies and TV shows."
                />
                <DiscoverView 
                    updateValue={this.updateValue}
                    scoreValues={scoreValues}
                    releaseValues={releaseValues}
                    sortBy={stableSortBy}
                    mediaType={stableMediaType}
                    withGenres={withGenres}
                    results={results}
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
    return {
        ...convertQueryParamsToProps(parsedParams, movieGenres, TVGenres),
        queryString: query,
        results: discoverResults
    };
}

export default Discover;
