import React from 'react';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
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
        posters: s.images.posters,
        backdrops: s.images.backdrops
    }
}

const ImagesPage = withErrorHandling(
    connect(mapState)(Images)
);

ImagesPage.getInitialProps = getInitialShowProps;

export default ImagesPage;
