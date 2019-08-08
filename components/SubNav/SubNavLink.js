import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useHover from '../useHover';
import { text } from '../../utils';

const StyledSubNavLink = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    text-decoration: none;
    height: 50px;
    display: inline-flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(0, 2)};
    color: ${({ theme, isActive, isHovered }) => (isActive || isHovered) ? theme.colors.primary : theme.colors.black};
    ${({ isActive }) => isActive && 'border-bottom: solid 3px;'}
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
}