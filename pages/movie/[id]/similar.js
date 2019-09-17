import React from 'react';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaListView from '../../../components/MediaListView';

function Similar({ id, title, posterPath, backdropPath, similar }) { 
    return (
        <MediaListView 
            id={id}
            mediaTitle={title}
            pageTitle="Similar Movies"
            posterPath={posterPath}
            backdropPath={backdropPath}
            items={similar}
            isMovie={true}
        />
    );
}

function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        backdropPath: m.backdrop_path,
        similar: m.similar.results
    };
}

const SimilarPage = withErrorHandling(
    connect(mapState)(Similar)
);

SimilarPage.getInitialProps = getInitialMovieProps;

export default SimilarPage;
