import React from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import { TwoColLayoutContainer, TwoColLayoutRow, MainCol, SidebarCol } from '../../components/Layout';
import ReviewPod from '../../components/ReviewPod';

function Reviews({ results }) {
    const showSubNavData = getShowSubNavData(results.id);
    return (
        <div>
            <MinimalHeader 
                imagePath={results.poster_path}
                name={results.name}
                backHref={`/show?id=${results.id}`}
                backAs={`/show/${results.id}`}
            />
            <SubNav navData={showSubNavData} />
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

Reviews.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Reviews;
