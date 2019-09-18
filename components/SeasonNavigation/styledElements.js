import styled from 'styled-components';
import { ArrowAltCircleLeft, ArrowAltCircleRight } from 'styled-icons/fa-solid';
import { Row } from '../Layout';

export const StyledSeasonNavigation = styled.div`
    border-top: solid 2px ${({ theme }) => theme.colors.uiSecondary};
    border-bottom: solid 2px ${({ theme }) => theme.colors.uiSecondary};
`;

export const SeasonNavigationRow = styled(Row)`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
`;

export const SeasonNavigationLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    margin-left: ${({ alignRight }) => alignRight ? 'auto' : 0};
    margin-right: ${({ alignRight }) => alignRight ? 0 : 'auto'};
    &:hover {
        text-decoration: underline;
    }
`;

export const BackArrow = styled(ArrowAltCircleLeft)`
    color: ${({ theme }) => theme.colors.black};
    width: 20px;
    max-height: 25px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

export const ForwardArrow = styled(ArrowAltCircleRight)`
    color: ${({ theme }) => theme.colors.black};
    width: 20px;
    max-height: 25px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
`;
