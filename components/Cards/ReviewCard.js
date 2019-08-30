import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useExpand from '../useExpand';
import { truncateAndFormatTextBody } from '../../utils';
import { ChevronDown } from 'styled-icons/fa-solid';

const StyledReviewCard = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
`;

const ReviewContentContainer = styled.div`
    padding: ${({ theme }) => theme.getSpacing(3)};
`;

const ReviewIntro = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 3, 0)};
`;

const ReviewParagraph = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    margin: ${({ theme }) => theme.getSpacing(3, 0, 0, 0)};
`;

const ToggleExpandedRow = styled.div`
    padding: ${({ theme }) => theme.getSpacing(1, 2)};
    border-top: solid 2px ${({ theme }) => theme.colors.uiPrimary};
`;

const ToggleExpandedButton = styled.button`
    border: none;
    color: ${({ theme }) => theme.colors.black};
    background: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(2)};
    width: 100%;
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

const ToggleIcon = styled(ChevronDown)`
    color: ${({ theme }) => theme.colors.black};
    width: 14px;
    max-height: 18px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

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
                        {isExpanded ? 'Read less' : 'Read more'}
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