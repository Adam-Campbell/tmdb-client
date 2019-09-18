import styled from 'styled-components';
import { ChevronDown } from 'styled-icons/fa-solid';

export const StyledReviewCard = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
`;

export const ReviewContentContainer = styled.div`
    padding: ${({ theme }) => theme.getSpacing(3)};
`;

export const ReviewIntro = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 3, 0)};
`;

export const ReviewParagraph = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    margin: ${({ theme }) => theme.getSpacing(3, 0, 0, 0)};
`;

export const ToggleExpandedRow = styled.div`
    padding: ${({ theme }) => theme.getSpacing(1, 2)};
    border-top: solid 2px ${({ theme }) => theme.colors.uiPrimary};
`;

export const ToggleExpandedButton = styled.button`
    border: none;
    color: ${({ theme }) => theme.colors.black};
    background: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: ${({ theme }) => theme.getSpacing(2)};
    width: 100%;
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

export const ToggleText = styled.span`
    margin-left: auto;
`;

export const ToggleIcon = styled(ChevronDown)`
    color: ${({ theme }) => theme.colors.black};
    width: 14px;
    max-height: 18px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
    margin-right: auto;
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;