import React from 'react';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
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
        reviews: s.reviews.results
    };
}

const ReviewsPage = withErrorHandling(
    connect(mapState)(Reviews)
);

ReviewsPage.getInitialProps = getInitialShowProps;

export default ReviewsPage;
