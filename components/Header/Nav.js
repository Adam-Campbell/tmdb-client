import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { NavItem } from './commonElements';
import SubNav from './SubNav';
import NavLink from './NavLink';
import { hideVisually } from 'polished';

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
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-300px)'};
    transition: transform ease-out 0.3s;
    padding-top: 50px;
    @media (min-width: 768px) {
        width: auto;
        height: auto;
        background: none;
        transform: translateX(0);
        transition: none;
        padding-top: 0;
    }
`;

const NavContainer = styled.div`
    background: ${({ theme, isOpen }) => isOpen ? theme.colors.overlayStrong : 'transparent'};
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100vw)'};
    transition: ${({ isOpen }) => isOpen ? 'background 0.3s ease-out' : 'transform 0.01s ease-out 0.3s, background 0.3s ease-out'};
    z-index: 4000;
    height: 100vh;
    width: 100vw;
    @media (min-width: 768px) {
        position: static;
        height: auto;
        width: auto;
        background: none;
        transform: translateX(0);
        transition: none;
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

const HiddenLabel = styled.label`
    ${hideVisually()}
`;

export default function Nav({ isOpen, setIsOpen }) {

    const containerEl = useRef(null);

    function closeOnOuterClick(e) {
        const { target } = e;
        if (containerEl.current && containerEl.current === target) {
            setIsOpen(false);
        }
    }

    return (
        <NavContainer 
            isOpen={isOpen}
            ref={containerEl}
            onClick={closeOnOuterClick}
        >
            <StyledNav 
                isOpen={isOpen} 
                aria-labelledby="main-site-navigation"
            >
                <HiddenLabel id="main-site-navigation">Main site navigation</HiddenLabel>
                <NavList>
                    <NavItem>
                        <NavLink 
                            route="/" 
                            name="Home" 
                            icon="home"
                            handleFocus={() => setIsOpen(true)} 
                        />
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
                        <NavLink 
                            route="/people" 
                            name="People" 
                            icon="people"
                            handleBlur={() => setIsOpen(false)}
                        />
                    </NavItem>
                </NavList>
            </StyledNav>
        </NavContainer>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
};
