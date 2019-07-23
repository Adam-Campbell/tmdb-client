import React, { useState } from 'react';
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
        overflow-y: initial;
    }
`;

const NavItem = styled.li`
    display: inline-block;
    position: relative;
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

const SubNavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    background: mediumseagreen;
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    @media (min-width: 768px) {
        position: absolute;
    }
`;

const SubNavItem = styled.li`
    display: flex;
`;

const SubNavAnchor = styled.a`
    flex-shrink: 0;
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

function SubNav({ name }) {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <NavItem
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(prev => !prev)}
        >
            <NavAnchor as="span">{name}</NavAnchor>
            <SubNavList isOpen={isOpen}>
                <SubNavItem>
                    <SubNavAnchor href="#">Item 1</SubNavAnchor>
                </SubNavItem>
                <SubNavItem>
                    <SubNavAnchor href="#">Item 2</SubNavAnchor>
                </SubNavItem>
            </SubNavList>
        </NavItem>
    );
}

export default function Nav({ isOpen, closeMenu }) {
    return (
        <StyledNav isOpen={isOpen}>
            <CloseNavButton onClick={closeMenu} />
            <NavList>
                <NavItem>
                    <Link as="/" href="/">
                        <NavAnchor>Home</NavAnchor>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link as="/discover" href="/discover">
                        <NavAnchor>Discover</NavAnchor>
                    </Link>
                </NavItem>
                <SubNav name="Movies" />
                <SubNav name="TV" />
                <NavItem>
                    <Link as="/people" href="/people">
                        <NavAnchor>People</NavAnchor>
                    </Link>
                </NavItem>
                
            </NavList>
        </StyledNav>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired
}

/*

{navData.map((data, index) => (
                    <NavItem key={index}>
                        <Link as={data.as} href={data.href}>
                            <NavAnchor>{data.text}</NavAnchor>
                        </Link>
                    </NavItem>
                ))}

*/