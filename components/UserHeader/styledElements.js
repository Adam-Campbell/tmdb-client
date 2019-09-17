import styled from 'styled-components';
import { Row } from '../Layout';

export const StyledUserHeader = styled.section`
    background: ${({ theme }) => theme.gradients.primary};
    padding: ${({ theme }) => theme.getSpacing(4, 0)};
    overflow: hidden;
`;

export const HeaderRow = styled(Row)`
    position: relative;
    max-width: 450px;
    @media (min-width: 768px) {
        max-width: 1080px;
    }
`;

export const UserIcon = styled.span`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.xl};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    flex-shrink: 0;
    @media (min-width: 768px) {
        width: 150px;
        height: 150px;
        font-size: 4.5rem;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const Username = styled.h1`
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin: 0;
    max-width: calc(100% - 100px);
    @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.heading.lg};
    }
`;

export const UsernameRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 768px) {
        display: block;
        margin-left: 200px;
    }
`;

export const RatingStatsRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: ${({ theme }) => theme.getSpacing(4)};
    @media (min-width: 768px) {
        margin-left: 200px;
        margin-top: ${({ theme }) => theme.getSpacing(3)};
        justify-content: flex-start;
    }
`;

export const RatingChartContainer = styled.div`
    width: 60px;
    height: 60px;
    @media (min-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

export const RatingItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const RatingDescription = styled.p`
    ${({ theme }) => theme.fontStacks.body({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-align: center;
    margin-top: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 768px) {
        text-align: left;
        font-size: ${({ theme }) => theme.fontSizes.body.md};
        margin-left: ${({ theme }) => theme.getSpacing(2)};
    }
`;

export const RatingItemSeparator = styled.span`
    display: inline-block;
    width: 2px;
    height: 100px;
    background: ${({ theme }) => theme.colors.white};
    @media (min-width: 768px) {
        margin: ${({ theme }) => theme.getSpacing(0, 4)};
        height: 75px;
    }
`;
