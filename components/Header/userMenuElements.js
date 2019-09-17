import styled from 'styled-components';
import { ellipsis } from 'polished';

export const Username = styled.p`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(2)};
    margin-bottom: auto;
    ${ellipsis()}
`;

export const UserMenuList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin: 0;
`;

export const ProfileLink = styled.a`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-decoration: none;
    display: block;
    padding: ${({ theme }) => theme.getSpacing(2)};
    color: ${({ theme, isHovered }) => isHovered ? theme.colors.white : theme.colors.black};
    background: ${({ theme, isHovered }) => isHovered ? theme.colors.complimentary : 'none'};
`;

export const LogoutButton = styled.button`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    background: none;
    cursor: pointer;
    display: block;
    width: 100%;
    padding: ${({ theme }) => theme.getSpacing(2)};
    border: none;
    text-align: left;
    color: ${({ theme, isHovered }) => isHovered ? theme.colors.white : theme.colors.black};
    background: ${({ theme, isHovered }) => isHovered ? theme.colors.complimentary : 'none'};
`;
