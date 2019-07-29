import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import { TwoColLayoutContainer, TwoColLayoutRow, MainCol, SidebarCol } from '../../components/Layout';
import ReviewPod from '../../components/ReviewPod';

import { fetchShow } from '../../actions';
import { getShowData } from '../../reducers/showReducer';
import { connect } from 'react-redux';

function Reviews({ id, title, posterPath, reviews }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);
    
    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/show?id=${id}`}
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

Reviews.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchShow(id));
    return {};
};

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        reviews: s.reviews.results
    };
}

export default connect(mapState)(Reviews);
