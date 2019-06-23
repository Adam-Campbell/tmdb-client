import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { text, truncateString } from '../../utils';

const StyledReviewPod = styled.div`
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 40px;
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
    &:hover {
        text-decoration: underline;
    }
`;

export function ReviewPod({ author, content, id, allReviewsHref, allReviewsAs }) {
    const truncatedContent = truncateString(content, 500);
    return (
        <StyledReviewPod>
            <ReviewAttribution>A review by {author}</ReviewAttribution>
            <ReviewExcerpt>{truncatedContent}</ReviewExcerpt>
            <Link href={allReviewsHref} as={allReviewsAs} passHref>
                <AllReviewsLink>View all reviews</AllReviewsLink>
            </Link>
        </StyledReviewPod>
    );
}

ReviewPod.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    allReviewsHref: PropTypes.string.isRequired,
    allReviewsAs: PropTypes.string.isRequired
};