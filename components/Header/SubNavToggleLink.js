import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHover from '../useHover';
import { useRouter } from 'next/router';
import { StyledNavLink } from './commonElements';
import Link from 'next/link';
import NavIcon from './NavIcon';

const SubNavToggleButton = styled(StyledNavLink)`
    border: none;
    @media (min-width: 768px) {
        display: none;
    }
    &:focus {
        outline: none;
    }
`;

const StyledSubNavToggleLink = styled(StyledNavLink)`
    display: none;
    @media (min-width: 768px) {
        display: inline-flex;
    }
`;

export default function SubNavToggleLink({ route, name, handleTouch, icon }) {
    const { isHovered, containerProps } = useHover();
    const router = useRouter();
    return (
        <>
            <SubNavToggleButton
                as="button"
                isActive={route === router.route}
                isHovered={isHovered}
                {...containerProps}
                onTouchStart={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTouch();
                }}
            >
                <NavIcon icon={icon} />
                {name}
            </SubNavToggleButton>
            <Link as={route} href={route} passHref>
                <StyledSubNavToggleLink
                    isActive={route === router.route}
                    isHovered={isHovered}
                    {...containerProps}
                >
                    {name}
                </StyledSubNavToggleLink>
            </Link>
        </>
    );
}

SubNavToggleLink.propTypes = {
    route: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleTouch: PropTypes.func.isRequired,
    icon: PropTypes.oneOf([
        'home', 
        'discover',
        'movies', 
        'tv', 
        'people' 
    ]).isRequired
};
