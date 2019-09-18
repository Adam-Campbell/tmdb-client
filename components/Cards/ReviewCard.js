import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useExpand from '../useExpand';
import { truncateAndFormatTextBody } from '../../utils';
import {
    StyledReviewCard,
    ReviewContentContainer, 
    ReviewIntro,
    ReviewParagraph,
    ToggleExpandedRow, 
    ToggleExpandedButton,
    ToggleText,
    ToggleIcon
} from './reviewCardElements';

export function ReviewCard({ author, content }) {

    const { isExpanded, anchorRef, handleToggleClick } = useExpand();

    const truncationThreshold = 600;
    const isExpandable = content.length > truncationThreshold;

    const reviewContent = useMemo(() => {
        return truncateAndFormatTextBody(
            content,
            (isExpandable && !isExpanded),
            truncationThreshold
        );
    }, [ isExpandable, isExpanded, content ]);

    return (
        <StyledReviewCard>
            <ReviewContentContainer>
                <ReviewIntro>A review by {author}</ReviewIntro>
                {reviewContent.map((paragraph, idx) => (
                    <ReviewParagraph key={idx}>{paragraph}</ReviewParagraph>
                ))}
            </ReviewContentContainer>
            {isExpandable && (
                <ToggleExpandedRow>
                    <ToggleExpandedButton 
                        ref={anchorRef}
                        onClick={handleToggleClick}
                        data-testid="review-card-toggle-button"
                    >
                        <ToggleText>{isExpanded ? 'Read less' : 'Read more'}</ToggleText>
                        <ToggleIcon isExpanded={isExpanded} />
                    </ToggleExpandedButton>
                </ToggleExpandedRow>
            )}
        </StyledReviewCard>
    )
}

ReviewCard.propTypes = {
    author: PropTypes.string,
    content: PropTypes.string
};
