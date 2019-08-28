import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import useHover from '../useHover';
import { useRouter } from 'next/router';
import { StyledNavLink } from './commonElements';
import NavIcon from './NavIcon';

function noop() {}

export default function NavLink({ 
    route, 
    name, 
    icon, 
    handleFocus = noop, 
    handleBlur = noop 
}) {
    const { isHovered, containerProps } = useHover();
    const router = useRouter();
    return (
        <Link as={route} href={route} passHref>
            <StyledNavLink
                isActive={router.route === route}
                isHovered={isHovered}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...containerProps}
            >
                <NavIcon icon={icon} />
                {name}
            </StyledNavLink>
        </Link>
    );
}

NavLink.propTypes = {
    route: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.oneOf([
        'home', 
        'discover',
        'movies', 
        'tv', 
        'people' 
    ]).isRequired,
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func
};