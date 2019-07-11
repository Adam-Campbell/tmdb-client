import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData } from '../../utils';
import { TwoColLayoutContainer, TwoColLayoutRow, MainCol, SidebarCol } from '../../components/Layout';
import ReviewPod from '../../components/ReviewPod';

import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

function Reviews({ results }) {
    const movieSubNavData = getMovieSubNavData(results.id);
    return (
        <div>
            <MinimalHeader 
                imagePath={results.poster_path}
                name={results.title}
                backHref={`/movie?id=${results.id}`}
                backAs={`/movie/${results.id}`}
            />
            <SubNav navData={movieSubNavData} />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        {results.reviews.results.map(review => (
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

Reviews.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchMovie(id));
    return {};
};

const mapState = (state) => ({
    results: getMovieData(state)
});

export default connect(mapState)(Reviews);
