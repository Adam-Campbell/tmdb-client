import React from 'react';
import PropTypes from 'prop-types';
import useHover from '../useHover';
import { useRouter } from 'next/router';
import { StyledNavLink } from './commonElements';

export default function SubNavToggle({ route, name, handleTouch }) {
    const { isHovered, containerProps } = useHover();
    const router = useRouter();
    return (
        <StyledNavLink
            as="span"
            isActive={route === router.route}
            isHovered={isHovered}
            {...containerProps}
            onTouchStart={e => {
                e.preventDefault();
                e.stopPropagation();
                handleTouch();
            }}
        >
            {name}
        </StyledNavLink>
    );
}

SubNavToggle.propTypes = {
    route: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleTouch: PropTypes.func.isRequired
};
