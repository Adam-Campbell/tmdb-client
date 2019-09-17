import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { truncateString } from '../../utils';
import ReviewSwitch from './ReviewSwitch';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {
    StyledReviewPod,
    ReviewContainer,
    ReviewAttribution,
    ReviewExcerpt,
    AllReviewsLink,
    ReviewAnimationWrapperStyles
} from './reviewPodElements';

export function ReviewPod({ reviews, linkDestinationHref, linkDestinationAs }) {

    if (!reviews.length) return null;

    const [ currentIndex, setIndex ] = useState(0);

    const { author, content, id } = reviews[currentIndex];
    
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
