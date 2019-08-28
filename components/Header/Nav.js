import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Close } from 'styled-icons/material';
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

const CloseNavButton = styled.button`
    color: ${({ theme }) => theme.colors.white};
    background: none;
    outline: 0;
    border: none;
    margin: ${({ theme }) => theme.getSpacing(2, 0, 0, 3)};
    cursor: pointer;
    &:focus {
        color: ${({ theme }) => theme.colors.complimentary};
    }
    @media (min-width: 768px) {
        display: none;
    }
`;

const CloseNavIcon = styled(Close)`
    width: 32px;
    cursor: pointer;
`;

const HiddenLabel = styled.label`
    ${hideVisually()}
`;

export default function Nav({ isOpen, setIsOpen }) {

    const navEl = useRef(null);
    const closeButtonEl = useRef(null);

    useEffect(() => {
        function closeOnOuterClick(e) {
            if (navEl.current && isOpen && !e.path.includes(navEl.current)) {
                setIsOpen(false);
            }
        }
        document.body.addEventListener('click', closeOnOuterClick);
        return function cleanup() {
            document.body.removeEventListener('click', closeOnOuterClick);
        }
    }, [ isOpen, setIsOpen ]);

    useEffect(() => {
        if (isOpen && closeButtonEl.current) {
            closeButtonEl.current.focus();
        }
    }, [ isOpen ])

    return (
        <NavContainer isOpen={isOpen}>
            <StyledNav isOpen={isOpen} ref={navEl} aria-labelledby="main-site-navigation">
                <HiddenLabel id="main-site-navigation">Main site navigation</HiddenLabel>
                <CloseNavButton
                    ref={closeButtonEl} 
                    onClick={() => setIsOpen(false)}
                    onFocus={() => setIsOpen(true)}
                >
                    <CloseNavIcon />
                </CloseNavButton>
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
