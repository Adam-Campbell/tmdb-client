import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Close } from 'styled-icons/material';
import { NavItem } from './commonElements';
import SubNav from './SubNav';
import NavLink from './NavLink';


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
    background: ${({ theme }) => theme.colors.primary};
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
    color: ${({ theme }) => theme.colors.white};
    margin: ${({ theme }) => theme.getSpacing(2, 0, 0, 3)};
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
                <NavItem>
                    <NavLink route="/" name="Home" />
                </NavItem>
                <NavItem>
                    <NavLink route="/discover" name="Discover" />
                </NavItem>
                <SubNav 
                    name="Movies" 
                    route="/movies"
                    subNavData={moviesSubNavData}
                />
                <SubNav 
                    name="TV" 
                    route="/tv"
                    subNavData={tvSubNavData}  
                />
                <NavItem>
                    <NavLink route="/people" name="People" />
                </NavItem>
                
            </NavList>
        </StyledNav>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired
};
