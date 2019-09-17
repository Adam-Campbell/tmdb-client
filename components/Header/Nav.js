import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { NavItem } from './commonElements';
import SubNav from './SubNav';
import NavLink from './NavLink';
import {
    StyledNav,
    NavContainer,
    NavList,
    HiddenLabel
} from './navElements';

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
