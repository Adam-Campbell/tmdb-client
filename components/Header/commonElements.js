import styled from 'styled-components';
import { text } from '../../utils';

export const NavItem = styled.li`
    display: inline-block;
    border-bottom: solid 2px ${({ theme }) => theme.colors.white};
    @media (min-width: 768px) {
        border-bottom: 0;
        & + & {
            margin-left: ${({ theme }) => theme.getSpacing(3)};
        }
    }
`;

export const StyledNavLink = styled.a`
    display: flex;
    align-items: center;
    width: 100%;
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    cursor: pointer;
    padding: ${({ theme }) => theme.getSpacing(3)};
    background: transparent;
    transition: background ease-out 0.2s;
    text-decoration: none;
    @media (min-width: 768px) {
        height: 50px;
        display: inline-flex;
        align-items: center;
        padding: ${({ theme }) => theme.getSpacing(3, 2)};
        color: ${({ theme, isActive, isHovered }) => (isActive || isHovered) ? theme.colors.primary : theme.colors.white};
        ${({ isActive }) => isActive && 'border-bottom: solid 3px;'}
    }
`;