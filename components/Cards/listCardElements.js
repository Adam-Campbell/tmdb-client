import styled from 'styled-components';
import { cover } from 'polished';

export const StyledListCard = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.getSpacing(3)};
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    @media (min-width: 600px) {
        width: calc(50% - 10px);
    }
`;

export const ListCardInnerContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
`;

export const ListImage = styled.img`
    ${cover()}
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
    transition: opacity ease-out 0.2s;
`;

export const ListLink = styled.a`
    display: flex;
    ${cover()}
    width: 100%;
    height: 100%;
    text-decoration: none;
`;

export const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ hasImage }) => hasImage ? 'rgba(26, 67, 93, 0.4)' : 'rgba(26, 67, 93, 1)'};
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

export const ListTitle = styled.h2`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.lg};
    font-style: italic;
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.getSpacing(2)};
    text-align: center;
    max-width: 100%;
`;

export const ItemCount = styled.p`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    margin-bottom: 0;
`;
