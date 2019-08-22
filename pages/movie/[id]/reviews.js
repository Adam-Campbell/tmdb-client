import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getMovieSubNavData } from '../../../utils';
import { TwoColLayoutContainer, TwoColLayoutRow, MainCol, SidebarCol } from '../../../components/Layout';
import ReviewPod from '../../../components/ReviewPod';

import { fetchMovie } from '../../../actions';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../.../../components/withErrorHandling';

function Reviews({ id, title, posterPath, backdropPath, reviews }) {
    
    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref={`/movie/[id]`}
                backAs={`/movie/${id}`}
            />
            <SubNav navData={movieSubNavData} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        {reviews.map(review => (
                            <ReviewPod 
                                key={review.id}
                                author={review.author}
                                content={review.content}
                                id={review.id}
                                allReviewsHref="/foo"
                                allReviewsAs="/foo"
                            />
                        ))}
                    </MainCol>
                    <SidebarCol>

                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
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
