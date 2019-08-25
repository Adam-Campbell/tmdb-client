import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getMovieSubNavData } from '../../../utils';
import { 
    TwoColLayoutContainer, 
    TwoColLayoutRow, 
    MainCol, 
    SidebarCol 
} from '../../../components/Layout';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import { ReviewCard } from '../../../components/Cards';
import MovieSidebar from '../../../components/MovieSidebar';
import MediaSeo from '../../../components/MediaSeo';

const NoReviewsMessage = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    margin: 0;
`;

function Reviews({ id, title, posterPath, backdropPath, reviews }) {
    
    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MediaSeo isMovie={true} />
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
                        <MovieSidebar />
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
