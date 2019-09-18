import styled from 'styled-components';
import {  Tv } from 'styled-icons/material';
import { cover } from 'polished';

export const StyledMediaCard = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

export const ImageContentContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding-bottom: 56.25%;
    flex-shrink: 0;
    @media (min-width: 600px) {
        padding-bottom: 0;
        display: block;
        width: 185px;
        height: 278px;
    }
    ${({ isInline }) => isInline || `
        @media (min-width: 900px) {
            width: 220px;
            height: 331px;
        }
    `}
`;

export const PlaceholderContainer = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.uiSecondary};
    display: ${({ hasBackdropImage }) => hasBackdropImage ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    @media (min-width: 600px) {
        display: ${({ hasPosterImage }) => hasPosterImage ? 'none' : 'flex'};
    }
`;

export const PlaceholderIcon = styled(Tv)`
    color: ${({ theme }) => theme.colors.black};
    min-width: 32px;
    width: 25%;
    @media (min-width: 600px) {
        width: 50%;
    }
`;

export const PosterImage = styled.img`
    display: none;
    transition: filter ease-out 0.2s, opacity ease-out 0.2s;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `}
    @media (min-width: 600px) {
        display: block;
        ${cover()}
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

export const BackdropImage = styled.img`
    ${cover()}
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all ease-out 0.2s;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `}
    @media (min-width: 600px) {
        display: none;
    }
`;

export const ImageOverlay = styled.div`
    ${cover()}
    transition: background ease-out 0.2s;
    cursor: pointer;
    background: ${({ isHovered }) => isHovered ? 'rgba(17,17,17,0.4)' : 'none'};
    display: ${({ hasBackdropImage }) => hasBackdropImage ? 'block' : 'none'};
    @media (min-width: 600px) {
        display: ${({ hasPosterImage }) => hasPosterImage ? 'block' : 'none'};
    }
`;

export const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
`;

export const OverviewText = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin-left: ${({ theme }) => theme.getSpacing(2)};
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 600px) {
        font-size: ${({ theme }) => theme.fontSizes.body.xs};
    }
    @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
    ${({ theme, isInline }) => isInline || `
        @media (min-width: 900px) {
            font-size: ${theme.fontSizes.body.md};
        }
    `}
`;

export const ActionRow = styled.div`
    margin-top: auto;
    height: 50px;
    border-top: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    padding-left: ${({ theme }) => theme.getSpacing(3)};
    display: flex;
    align-items: center;
`;

export const MoreInfoLink = styled.a`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
