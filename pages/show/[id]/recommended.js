import React from 'react';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaListView from '../../../components/MediaListView';

function Recommended({ id, title, posterPath, backdropPath, recommendations }) { 
    return (
        <MediaListView 
            id={id}
            mediaTitle={title}
            pageTitle="Recommended TV Shows"
            posterPath={posterPath}
            backdropPath={backdropPath}
            items={recommendations}
            isMovie={false}
        />
    );
}

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        backdropPath: s.backdrop_path,
        recommendations: s.recommendations.results
    };
}

const RecommendedPage = withErrorHandling(
    connect(mapState)(Recommended)
);

RecommendedPage.getInitialProps = getInitialShowProps;

export default RecommendedPage;
