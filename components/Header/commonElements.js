import styled from 'styled-components';
import { text } from '../../utils';

export const NavItem = styled.li`
    display: inline-block;
    border-bottom: solid #fff 2px;
    @media (min-width: 768px) {
        border-bottom: 0;
        & + & {
            margin-left: 20px;
        }
    }
`;

export const NavAnchor = styled.a`
    display: block;
    ${text('body', { fontWeight: 700, color: '#fff' })}
    cursor: pointer;
    padding: 20px;
    background: transparent;
    transition: background ease-out 0.2s;
    @media (min-width: 768px) {
        height: 50px;
        display: inline-flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        color: ${({ isActive }) => isActive ? '#43cbe8' : '#fff'};
        ${({ isActive }) => isActive && 'border-bottom: solid 2px;'}
    }
`;