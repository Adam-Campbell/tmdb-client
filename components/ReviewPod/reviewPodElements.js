import styled, { createGlobalStyle } from 'styled-components';

export const StyledReviewPod = styled.section`
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
`;

export const ReviewContainer = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    padding: ${({ theme }) => theme.getSpacing(3)};
    overflow-x: hidden;
`;

export const ReviewAttribution = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
`;

export const ReviewExcerpt = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export const AllReviewsLink = styled.a`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    display: inline-block;
    &:hover {
        text-decoration: underline;
    }
`;

export const ReviewAnimationWrapperStyles = createGlobalStyle`
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
