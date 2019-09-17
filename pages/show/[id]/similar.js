import React from 'react';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaListView from '../../../components/MediaListView';

function Similar({ id, title, posterPath, backdropPath, similar }) { 
    return (
        <MediaListView 
            id={id}
            mediaTitle={title}
            pageTitle="Similar TV Shows"
            posterPath={posterPath}
            backdropPath={backdropPath}
            items={similar}
            isMovie={false}
        />
    );
}

function mapState(state) {
    const s = getShowData(state)
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        backdropPath: s.backdrop_path,
        similar: s.similar.results
    };
}

const SimilarPage = withErrorHandling(
    connect(mapState)(Similar)
);

SimilarPage.getInitialProps = getInitialShowProps;

export default SimilarPage;
