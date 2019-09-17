import styled from 'styled-components';
import ImageLink from '../ImageLink';

export const StyledSeasonCard = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    display: flex;
    align-items: center;
    @media(min-width: 550px) {
        align-items: flex-start;
    }
`;

export const PosterImageLink = styled(ImageLink)`
    width: 100px;
    height: 150px;
    flex-shrink: 0;
    @media (min-width: 360px) {
        width: 130px;
        height: 210px
    }
    @media (min-width: 550px) {
        width: 185px;
        height: 277.5px;
    }
`;

export const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
`;

export const TitleRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 550px) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
`;

export const TitleLink = styled.a`
    margin: ${({ theme }) => theme.getSpacing(0, 2, 2, 0)};
    text-decoration: none;
    @media (min-width: 550px) {
        margin-bottom: 0;
    }
`;

export const Title = styled.h3`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
    margin: 0;
    cursor: pointer;
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.heading.md};
    }
`;

export const SeasonInfo = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin: 4px 0 0 0;
`;

export const SeasonOverview = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
`;