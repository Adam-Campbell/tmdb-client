import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';
import useHover from '../useHover';
import { useRouter } from 'next/router';
import Link from 'next/link';

const StyledSubNavLink = styled.a`
    display: block;
    ${text('body', { fontWeight: 700, color: '#fff' })}
    cursor: pointer;
    text-decoration: none;
    padding: 20px;
    @media (min-width: 768px) {
        padding: 10px;
        font-weight: ${({ isActive }) => isActive ? 700 : 400};
        color: ${({ isActive, isHovered }) => (isActive || isHovered) ? '#1a435d' : '#fff'};
        ${({ isActive }) => isActive && 'border-left: solid 3px #1a435d;'}
    }
`;

export default function SubNavLink({ as, href, name }) {
    const { isHovered, containerProps } = useHover();
    const router = useRouter();
    return (
        <Link as={as} href={href} passHref>
            <StyledSubNavLink
                isHovered={isHovered}
                isActive={router.asPath === as}
                {...containerProps}
            >
                {name}
            </StyledSubNavLink>
        </Link>
    );
}

SubNavLink.propTypes = {
    as: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};