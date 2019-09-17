import styled from 'styled-components';
import { Movie, Tv, Person, Search } from 'styled-icons/material';
import { Row } from '../Layout';

export const SearchIcon = styled(Search)`
    color: ${({ theme }) => theme.colors.black};
    width: 20px;
    max-height: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

export const MovieIcon = styled(Movie)`
    width: 20px;
    max-height: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

export const TVIcon = styled(Tv)`
    width: 20px;
    max-height: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

export const PersonIcon = styled(Person)`
    width: 20px;
    max-height: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
    flex-shrink: 0;
`;

export const StyledSearchItem = styled.li`
    cursor: pointer;
    background: ${({ theme, isHighlighted }) => isHighlighted ? theme.colors.primary : theme.colors.white};
    color: ${({ theme, isHighlighted }) => isHighlighted ? theme.colors.white : theme.colors.black};
    border-bottom: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    &:first-child {
        border-top: solid 1px ${({ theme }) => theme.colors.uiSecondary};
    }
`;

export const SearchItemContentContainer = styled(Row)`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(1, 0)};
`;

export const SearchItemName = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    color: inherit;
    margin: 0;
    max-width: 100%;
`;

export const CategoryLabel = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    font-style: italic;
    color: inherit;
    display: inline-block;
    margin-left: ${({ theme }) => theme.getSpacing(1)};
`;
