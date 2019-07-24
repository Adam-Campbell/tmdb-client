import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Close } from 'styled-icons/material';
import { NavItem, NavAnchor } from './commonElements';
import SubNav from './SubNav';
import { useRouter } from 'next/router';

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

const moviesSubNavData = [
    {
        href: '/movies?subcategory=popular',
        as: '/movies',
        name: 'Popular'
    },
    {
        as: '/movies/top-rated',
        href: '/movies?subcategory=top-rated',
        name: 'Top rated'
    },
    {
        as: '/movies/now-playing',
        href: '/movies?subcategory=now-playing',
        name: 'Now playing'
    },
    {
        as: '/movies/upcoming',
        href: '/movies?subcategory=upcoming',
        name: 'Upcoming'
    }
]

const tvSubNavData = [
    {
        as: '/tv',
        href: '/tv?subcategory=popular',
        name: 'Popular'
    },
    {
        as: '/tv/top-rated',
        href: '/tv?subcategory=top-rated',
        name: 'Top rated'
    },
    {
        as: '/tv/on-tv',
        href: '/tv?subcategory=on-tv',
        name: 'On TV'
    },
    {
        as: '/tv/airing-today',
        href: '/tv?subcategory=airing-today',
        name: 'Airing today'
    }
];

const  StyledNav = styled.nav`
    background: cornflowerblue;
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => isOpen ? 0 : '-300px'};
    z-index: 1000;
    height: 100vh;
    width: 300px;
    @media (min-width: 768px) {
        position: static;
        height: auto;
        width: auto;
        background: none;
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
    const router = useRouter();
    /*
        router.route will equal:
        "/"
        "/discover"
        "/movies"
        "/tv"
        "/people"
    */
    
    return (
        <StyledNav isOpen={isOpen}>
            <CloseNavButton onClick={closeMenu} />
            <NavList>
                <NavItem>
                    <Link as="/" href="/">
                        <NavAnchor isActive={router.route === '/'}>Home</NavAnchor>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link as="/discover" href="/discover">
                        <NavAnchor isActive={router.route === '/discover'}>Discover</NavAnchor>
                    </Link>
                </NavItem>
                <SubNav 
                    name="Movies" 
                    subNavData={moviesSubNavData}
                    activeRoute={router.route}
                    route="/movies" 
                />
                <SubNav 
                    name="TV" 
                    subNavData={tvSubNavData}
                    activeRoute={router.route}
                    route="/tv" 
                />
                <NavItem>
                    <Link as="/people" href="/people">
                        <NavAnchor isActive={router.route === '/people'}>People</NavAnchor>
                    </Link>
                </NavItem>
                
            </NavList>
        </StyledNav>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired
};
