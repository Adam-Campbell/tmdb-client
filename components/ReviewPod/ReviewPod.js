import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { truncateString } from '../../utils';
import ReviewSwitch from './ReviewSwitch';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const StyledReviewPod = styled.section`
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
`;

const ReviewContainer = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    padding: ${({ theme }) => theme.getSpacing(3)};
    overflow-x: hidden;
`;

const ReviewAttribution = styled.h3`
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

const ReviewAnimationWrapperStyles = createGlobalStyle`
    .review-animation-wrapper {
        opacity: 1;
        transform: translateX(0);
        &-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        &-enter-active {
            opacity: 1;
            transform: translateX(0);
            transition: all 0.3s ease-out; 
        }
        &-exit {
            opacity: 1;
            transform: translateX(0);
        }
        &-exit-active {
            opacity: 0;
            transform: translateX(-100%);
            transition: all 0.3s ease-out; 
        }
    }
`;

export function ReviewPod({ reviews, linkDestinationHref, linkDestinationAs }) {
    if (!reviews.length) return null;

    const [ currentIndex, setIndex ] = useState(0);

    const { author, content, id } = reviews[currentIndex]
    const truncatedContent = truncateString(content, 500);

    return (
        <StyledReviewPod>
            <ReviewAnimationWrapperStyles />
            <ReviewContainer>
                <SwitchTransition>
                    <CSSTransition key={id} timeout={300} classNames="review-animation-wrapper">
                        <div className="review-animation-wrapper">
                            <ReviewAttribution>A review by {author}</ReviewAttribution>
                            <ReviewExcerpt>{truncatedContent}</ReviewExcerpt>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
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