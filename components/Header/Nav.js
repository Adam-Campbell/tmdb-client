import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Close } from 'styled-icons/material';

const navData = [
	{
		as: '/',
		href: '/',
		text: 'Home'
	},
	{
		as: '/discover',
		href: '/discover',
		text: 'Discover'
	},
	{
		as: '/movies',
		href: '/movies',
		text: 'Movies'
	},
	{
		as: '/tv',
		href: '/tv',
		text: 'TV'
	},
	{
		as: '/people',
		href: '/people',
		text: 'People'
    }
];

const  StyledNav = styled.nav`
    background: cornflowerblue;
    position: absolute;
    top: 0;
    left: ${({ isOpen }) => isOpen ? 0 : '-300px'};
    z-index: 1000;
    height: 100vh;
    width: 300px;
    @media (min-width: 768px) {
        position: static;
        height: auto;
        width: auto;
    }
`;

const NavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-height: calc(100vh - 50px);
    overflow-y: auto;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const NavItem = styled.li`
    display: inline-block;
    @media (min-width: 768px) {
        & + & {
            margin-left: 20px;
        }
    }
`;

const NavAnchor = styled.a`
    display: block;
    font-family: sans-serif;
    color: white;
    font-weight: 400;
    cursor: pointer;
    border-radius: 3px;
    padding: 20px;
    background: transparent;
    transition: background ease-out 0.2s;
    &:hover {
        background: rgba(220,220,220,0.2);
    }
    @media (min-width: 768px) {
        padding: 10px;
    }
`;

const CloseNavButton = styled(Close)`
    width: 32px;
    color: #fff;
    margin-left: 20px;
    margin-top: 10px;
    cursor: pointer;
    @media (min-width: 768px) {
        display: none;
    }
`;

export default function Nav({ isOpen, closeMenu }) {
    return (
        <StyledNav isOpen={isOpen}>
            <CloseNavButton onClick={closeMenu} />
            <NavList>
                {navData.map((data, index) => (
                    <NavItem key={index}>
                        <Link as={data.as} href={data.href}>
                            <NavAnchor>{data.text}</NavAnchor>
                        </Link>
                    </NavItem>
                ))}
            </NavList>
        </StyledNav>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired
}