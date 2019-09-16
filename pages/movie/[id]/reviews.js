import React from 'react';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaReviewsView from '../../../components/MediaReviewsView';

function Reviews({ id, title, posterPath, backdropPath, reviews }) {
    return (
        <MediaReviewsView 
            id={id}
            title={title}
            posterPath={posterPath}
            backdropPath={backdropPath}
            reviews={reviews}
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
        reviews: m.reviews.results
    };
}

const ReviewsPage = withErrorHandling(
    connect(mapState)(Reviews)
);

ReviewsPage.getInitialProps = getInitialMovieProps;

export default ReviewsPage;
