import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { text } from '../../utils';
import useHover from '../useHover';
import { useRouter } from 'next/router';
import Link from 'next/link';

const StyledSubNavLink = styled.a`
    display: block;
    ${({ theme }) => theme.fontStacks.bodyBold({ useLight: true })}
    cursor: pointer;
    text-decoration: none;
    padding: ${({ theme }) => theme.getSpacing(3)};
    @media (min-width: 768px) {
        padding: ${({ theme }) => theme.getSpacing(2)};
        font-weight: ${({ isActive }) => isActive ? 600 : 300};
        color: ${({ theme, isActive, isHovered }) => (isActive || isHovered) ? theme.colors.complimentary : theme.colors.white};
        ${({ theme, isActive }) => isActive && `border-left: solid 3px ${theme.colors.complimentary};`}
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