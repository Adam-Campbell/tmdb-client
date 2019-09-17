import styled from 'styled-components';
import { cover } from 'polished';
import { Row } from '../Layout';
import { LongArrowAltLeft } from 'styled-icons/fa-solid';
import SmartImage from '../SmartImage';

export const StyledMinimalHeader = styled.section`
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
    background: ${({ theme, hasImage }) => hasImage ? theme.colors.overlayStrong : theme.gradients.primary};
    position: relative;
`;

export const MinimalHeaderRow = styled(Row)`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
`;

export const Image = styled(SmartImage)`
    width: 85px;
    height: 127.5px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    flex-shrink: 0;
`;


export const Title = styled.h1`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.lg};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 2, 0)};
`;

export const BackLink = styled.a`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.uiSecondary};
    }
`;

export const BackIcon = styled(LongArrowAltLeft)`
    width: 25px;
    max-height: 25px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;
