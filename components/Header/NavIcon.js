import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Movie, Tv, Person, Home, ViewList } from 'styled-icons/material';

const HomeIcon = styled(Home)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 768px) {
        display: none;
    }
`;

const MovieIcon = styled(Movie)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 768px) {
        display: none;
    }
`;

const TVIcon = styled(Tv)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 768px) {
        display: none;
    }
`;

const PersonIcon = styled(Person)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 768px) {
        display: none;
    }
`;

const DiscoverIcon = styled(ViewList)`
    width: 20px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 768px) {
        display: none;
    }
`;

export default function NavIcon({ icon }) {
    switch (icon) {
        case 'home':
            return <HomeIcon />;
        case 'discover':
            return <DiscoverIcon />;
        case 'movies':
            return <MovieIcon />;
        case 'tv':
            return <TVIcon />;
        case 'people':
            return <PersonIcon />;
        default:
            return <HomeIcon />;
    }
}

NavIcon.propTypes = {
    icon: PropTypes.oneOf([
        'home', 
        'discover',
        'movies', 
        'tv', 
        'people' 
    ]).isRequired
};