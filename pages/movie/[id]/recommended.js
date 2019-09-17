import React from 'react';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaListView from '../../../components/MediaListView';

function Recommended({ id, title, posterPath, backdropPath, recommendations }) { 
    return (
        <MediaListView 
            id={id}
            mediaTitle={title}
            pageTitle="Recommended Movies"
            posterPath={posterPath}
            backdropPath={backdropPath}
            items={recommendations}
            isMovie={true}
        />
    );
}

function mapState(state, ownProps) {
    const m = getMovieData(state);
    return {
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        backdropPath: m.backdrop_path,
        recommendations: m.recommendations.results
    };
}

const RecommendedPage = withErrorHandling( 
    connect(mapState)(Recommended)
);

RecommendedPage.getInitialProps = getInitialMovieProps;

export default RecommendedPage;
