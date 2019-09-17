import styled from 'styled-components';
import { cover } from 'polished';

export const StyledImageLink = styled.a`
    position: relative;
    display: flex;
`;

export const LinkContentContainer = styled.div`
    position: relative;
    display: flex;
`;

export const PlaceholderContainer = styled.div`
    background: ${({ theme }) => theme.colors.uiSecondary};
    ${cover()}
    width: 100%;
    height: 100%;
`;

export const StyledImage = styled.img`
    ${cover(0)}
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all ease-out 0.2s;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    ${({ isHovered }) => isHovered && `
        filter: grayscale(75%) contrast(110%);
    `} 
`;

export const ImageOverlay = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    transition: background ease-out 0.2s;
    cursor: pointer;
    background: ${({ isHovered }) => isHovered ? 'rgba(17,17,17,0.4)' : 'none'};
`;
