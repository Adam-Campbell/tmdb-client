import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getMovieSubNavData, getShowSubNavData } from '../../utils';
import { MediaSeo } from '../Seo';
import MinimalHeader from '../MinimalHeader';
import SubNav from '../SubNav';
import {
    TwoColLayoutContainer,
    TwoColLayoutRow,
    MainCol,
    SidebarCol
} from '../Layout';
import TitleBlock from '../TitleBlock';
import { ReviewCard } from '../Cards';
import ShowSidebar from '../ShowSidebar';
import MovieSidebar from '../MovieSidebar';

const NoReviewsMessage = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    margin: 0;
`;

export function MediaReviewsView({ 
    id, 
    title, 
    posterPath, 
    backdropPath, 
    reviews, 
    isMovie 
}) {

    const subNavData = useMemo(() => {
        return isMovie ? getMovieSubNavData(id) : getShowSubNavData(id);
    }, [ id, isMovie ]);

    return (
        <>
            <MediaSeo isMovie={isMovie} uniqueTitleSegment="User Reviews" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref={isMovie ? '/movie/[id]' : '/show/[id]'}
                backAs={isMovie ? `/movie/${id}` : `/show/${id}`}
            />
            <SubNav 
                navData={subNavData}
                navLabel={
                    `Navigation links for pages related to the current ${isMovie ? 'movie' : 'TV show'}`
                }
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <TitleBlock title="Reviews" headingTag="h2" />
                        {reviews.length ? reviews.map(review => (
                            <ReviewCard
                                key={review.id} 
                                author={review.author}
                                content={review.content}
                            />  
                        )) : (
                            <NoReviewsMessage>
                                There are no user reviews for this {isMovie ? 'movie' : 'TV show'}
                            </NoReviewsMessage>
                        )}
                    </MainCol>
                    <SidebarCol>
                        {isMovie ? <MovieSidebar /> : <ShowSidebar />}
                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </>
    );
}

MediaReviewsView.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    backdropPath: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    isMovie: PropTypes.bool.isRequired
};
