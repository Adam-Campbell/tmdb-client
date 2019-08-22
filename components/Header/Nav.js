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
        href: '/movies/[subcategory]',
        as: '/movies/popular',
        name: 'Popular'
    },
    {
        href: '/movies/[subcategory]',
        as: '/movies/top-rated',
        name: 'Top rated'
    },
    {
        href: '/movies/[subcategory]',
        as: '/movies/now-playing',
        name: 'Now playing'
    },
    {
        href: '/movies/[subcategory]',
        as: '/movies/upcoming',
        name: 'Upcoming'
    }
]

const tvSubNavData = [
    {
        href: '/tv/[subcategory]',
        as: '/tv/popular',
        name: 'Popular'
    },
    {
        href: '/tv/[subcategory]',
        as: '/tv/top-rated',
        name: 'Top rated'
    },
    {
        href: '/tv/[subcategory]',
        as: '/tv/on-tv',
        name: 'On TV'
    },
    {
        href: '/tv/[subcategory]',
        as: '/tv/airing-today',
        name: 'Airing today'
    }
];

const StyledNav = styled.nav`
    background: ${({ theme }) => theme.colors.primary};
    width: 300px;
    height: 100vh;
    @media (min-width: 768px) {
        width: auto;
        height: auto;
        background: none;
    }
`;

const NavContainer = styled.div`
    background: ${({ theme }) => theme.colors.overlayStrong};
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => isOpen ? 0 : '-100vw'};
    z-index: 1000;
    height: 100vh;
    width: 100vw;
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
        <NavContainer isOpen={isOpen}>
            <StyledNav isOpen={isOpen}>
                <CloseNavButton onClick={closeMenu} />
                <NavList>
                    <NavItem>
                        <NavLink route="/" name="Home" icon="home" />
                    </NavItem>
                    <NavItem>
                        <NavLink route="/discover" name="Discover" icon="discover" />
                    </NavItem>
                    <SubNav 
                        name="Movies" 
                        route="/movies"
                        subNavData={moviesSubNavData}
                        icon="movies"
                    />
                    <SubNav 
                        name="TV" 
                        route="/tv"
                        subNavData={tvSubNavData} 
                        icon="tv" 
                    />
                    <NavItem>
                        <NavLink route="/people" name="People" icon="people" />
                    </NavItem>
                    
                </NavList>
            </StyledNav>
        </NavContainer>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired
};
