import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getShowSubNavData } from '../../../utils';
import { TwoColLayoutContainer, TwoColLayoutRow, MainCol, SidebarCol } from '../../../components/Layout';
import ReviewPod from '../../../components/ReviewPod';

import { fetchShow } from '../../../actions';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';

function Reviews({ id, title, posterPath, backdropPath, reviews }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);
    
    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref="/show/[id]"
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
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

Reviews.getInitialProps = getInitialShowProps;

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
