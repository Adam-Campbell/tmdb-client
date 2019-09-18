import styled from 'styled-components';
import { cover } from 'polished';
import SmartImage from '../SmartImage';
import { Row } from '../Layout';

export const MediaHeaderContainer = styled.section`
    position: relative;
`;

export const BackdropImageHolder = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    background: ${({ imageUrl }) => `url('${imageUrl}')`};
    background-size: cover;
    background-position: center;
    filter: grayscale(75%) contrast(110%);
`;

export const BackdropImageOverlay = styled.div`
    background: ${({ theme }) => theme.colors.overlayStrong};
    position: relative;
`;

export const PosterImage = styled(SmartImage)`
    display: none;
    margin-right: ${({ theme }) => theme.getSpacing(4)};
    flex-shrink: 0;
    @media(min-width: 600px) {
        display: block;
        width: 200px;
        height: 300px;
    }
    @media(min-width: 768px) {
        width: 300px;
        height: 450px;
    }
`;

export const MediaHeaderContentRow = styled(Row)`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(4, 0)};
`;

export const MediaTitle = styled.h1`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: 2rem;
`;

export const MediaTagline = styled.p`
    font-family: serif;
    font-size: ${({ theme }) => theme.fontSizes.body.xl};
    font-style: italic;
    color: ${({ theme }) => theme.colors.white};
`;

export const Subheading = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export const MediaOverview = styled.p`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

export const InteractionRow = styled.div`
    display: flex;
    align-items: center;
`;

export const RatingContainer = styled.div`
    width: 80px;
    height: 80px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
`;
