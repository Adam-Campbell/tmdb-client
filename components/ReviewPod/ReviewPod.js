import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text, truncateString } from '../../utils';
import ReviewSwitch from './ReviewSwitch';

const StyledReviewPod = styled.section`
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
`;

const ReviewContainer = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    padding: ${({ theme }) => theme.getSpacing(3)};
`;

const ReviewAttribution = styled.p`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
`;

const ReviewExcerpt = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

const AllReviewsLink = styled.a`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
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