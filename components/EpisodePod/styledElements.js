import styled from 'styled-components';
import SmartImage from '../SmartImage';
import { ChevronDown } from 'styled-icons/fa-solid';

export const StyledEpisodePod = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    background: ${({ theme }) => theme.colors.white};
`;

export const MainInfoCard = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

export const EpisodeImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    flex-shrink: 0;
    @media (min-width: 768px) {
        width: 300px;
        height: 168.75px;
        padding-bottom: 0;
    }
`;

export const EpisodeImage = styled(SmartImage)`
    width: 100%;
    padding-bottom: 56.25%;
    flex-shrink: 0;
    @media (min-width: 768px) {
        width: 300px;
        height: 168.75px;
        padding-bottom: 0;
    }
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

export const EpisodeRatingContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

export const EpisodeTitle = styled.h3`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 1, 0)};
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.md};
    }
`;

export const AirDate = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(1, 0, 0, 0)};
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    } 
`;

export const Overview = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
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

export const AdditionalInfoContainer = styled.div`
    display: ${({ isHidden }) => isHidden ? 'none' : 'block'};
    padding: ${({ theme }) => theme.getSpacing(2)};
`;
