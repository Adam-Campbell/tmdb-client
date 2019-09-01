import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import useHover from '../useHover';

const StyledPageLink = styled.a`
    display: inline-block;
    ${({ theme }) => theme.fontStacks.bodyBold()}
    color: ${({ theme, isHovered, isActive }) => {
        return (isHovered || isActive) ? theme.colors.white : theme.colors.black;
    }};
    background: ${({ theme, isHovered, isActive }) => {
        return (isHovered || isActive) ? theme.colors.primary : theme.colors.uiPrimary;
    }};
    border-radius: 3px;
    border: none;
    text-decoration: none;
    padding: ${({ theme }) => theme.getSpacing(1)};
    margin: ${({ theme }) => theme.getSpacing(1)};
`;

export default function PageLink({ href, as, pageNumber, isActive }) {

    const { isHovered, containerProps } = useHover();

    return (
        <Link
            href={href}
            as={as}
            passHref
        >
            <StyledPageLink
                isHovered={isHovered}
                isActive={isActive}
                {...containerProps}
            >{pageNumber}</StyledPageLink>
        </Link>
    );
}

PageLink.propTypes = {
    href: PropTypes.string,
    as: PropTypes.string,
    pageNumber: PropTypes.number,
    isActive: PropTypes.bool
};
