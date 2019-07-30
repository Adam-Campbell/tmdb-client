import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text, truncateString } from '../../utils';
import ReviewSwitch from './ReviewSwitch';

const StyledReviewPod = styled.div`
    margin-bottom: 40px;
`;

const ReviewContainer = styled.div`
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
`;

const ReviewAttribution = styled.p`
    ${text('heading', { fontSize: '1.25rem' })}
`;

const ReviewExcerpt = styled.p`
    ${text('body')}
`;

const AllReviewsLink = styled.a`
    ${text('body')}
    text-decoration: none;
    margin-top: 20px;
    display: inline-block;
    &:hover {
        text-decoration: underline;
    }
`;

export function ReviewPod({ reviews, linkDestinationHref, linkDestinationAs }) {
    if (!reviews.length) return null;

    const [ currentIndex, setIndex ] = useState(0);

    const { author, content, id } = reviews[currentIndex]
    const truncatedContent = truncateString(content, 500);

    return (
        <StyledReviewPod>
            <ReviewContainer>
                <ReviewAttribution>A review by {author}</ReviewAttribution>
                <ReviewExcerpt>{truncatedContent}</ReviewExcerpt>
            </ReviewContainer>
            {reviews.length > 1 && <ReviewSwitch 
                numberOfReviews={reviews.length}
                currentIndex={currentIndex}
                setIndex={setIndex}
            />}
            <Link href={linkDestinationHref} as={linkDestinationAs} passHref>
                <AllReviewsLink>View all reviews</AllReviewsLink>
            </Link>
        </StyledReviewPod>
    );
}

ReviewPod.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.object),
    linkDestinationHref: PropTypes.string.isRequired,
    linkDestinationAs: PropTypes.string.isRequired
};