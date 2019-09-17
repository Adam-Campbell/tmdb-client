import styled from 'styled-components';
import { ellipsis } from 'polished';
import ImageLink from '../ImageLink';

export const StyledMinimalCard = styled.div`
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    ${({ isInline }) => isInline && `
        width: calc(50% - 5px);
        @media (min-width: 550px) {
            width: calc(25% - 7.5px);
        }
    `}
    ${({ theme, isInline }) => isInline || `
        width: calc(50% - 5px);
        margin-right: ${theme.getSpacing(2)};
        @media (max-width: 549px) {
            &:nth-child(2n) {
                margin-right: 0;
            }
        }
        @media (min-width: 550px) and (max-width: 767px) {
            width: calc(33.33333% - 6.66666px);
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
        @media (min-width: 768px) and (max-width: 959px) {
            width: calc(25% - 7.5px);
            &:nth-child(4n) {
                margin-right: 0;
            }
        }
        @media (min-width: 960px) {
            width: calc(20% - 8px);
            &:nth-child(5n) {
                margin-right: 0;
            }
        }
    `}
`;

export const CardImageLink = styled(ImageLink)`
    padding-bottom: 150%;
`;

export const InfoRow = styled.div`
    padding: ${({ theme }) => theme.getSpacing(2)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const NameLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-decoration: none;
    margin-bottom: ${({ theme }) => theme.getSpacing(1)};
    display: inline-block;
    max-width: 100%;
    &:hover {
        text-decoration: underline;
    }
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.md};
    }
`;

export const AdditionalDetailsText = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    display: block;
    max-width: 100%;
    ${({ shouldTruncateDetails }) => shouldTruncateDetails && ellipsis()}
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
`;
