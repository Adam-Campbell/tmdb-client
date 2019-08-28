import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getShowSubNavData } from '../../../utils';
import { 
    TwoColLayoutContainer, 
    TwoColLayoutRow, 
    MainCol, 
    SidebarCol 
} from '../../../components/Layout';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import { ReviewCard } from '../../../components/Cards';
import ShowSidebar from '../../../components/ShowSidebar';
import { MediaSeo } from '../../../components/Seo';

const NoReviewsMessage = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    margin: 0;
`;

function Reviews({ id, title, posterPath, backdropPath, reviews }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);
    
    return (
        <>
            <MediaSeo uniqueTitleSegment="User Reviews" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref="/show/[id]"
                backAs={`/show/${id}`}
            />
            <SubNav 
                navData={showSubNavData} 
                navLabel="Navigation links for pages related to the current TV show"
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        {reviews.length ? reviews.map(review => (
                            <ReviewCard
                                key={review.id} 
                                author={review.author}
                                content={review.content}
                            />  
                        )) : (
                            <NoReviewsMessage>
                                There are no user reviews for this movie
                            </NoReviewsMessage>
                        )}
                    </MainCol>
                    <SidebarCol>
                        <ShowSidebar />
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </>
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
