import React from 'react';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaGalleryView from '../../../components/MediaGalleryView';

function Images({ id, title, posterPath, backdropPath, posters, backdrops }) {
    return (
        <MediaGalleryView 
            id={id}
            title={title}
            posterPath={posterPath}
            backdropPath={backdropPath}
            posters={posters}
            backdrops={backdrops}
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
        posters: m.images.posters,
        backdrops: m.images.backdrops
    };
}

const ImagesPage = withErrorHandling(
    connect(mapState)(Images)
);

ImagesPage.getInitialProps = getInitialMovieProps;

export default ImagesPage;
