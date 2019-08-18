import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useHover from '../useHover';
import Link from 'next/link';

const ListItem = styled.li`
    & + & {
        margin-left: ${({ theme }) => theme.getSpacing(2)};
    }
`;

const NavigationLink = styled.a`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
    font-weight: ${({ isActive }) => isActive ? 600 : 300};
    text-decoration: ${({ isActive }) => isActive ? 'underline' : 'none'};
    color: ${({ isActive, isHovered, theme }) => (isActive || isHovered) ? 
        theme.colors.primary : 
        theme.colors.black
    };
    cursor: pointer;
`;

export default function SearchNavigationLink({ as, href, name }) {

    const { isHovered, containerProps } = useHover();

    const router = useRouter();

    return (
        <ListItem>
            <Link href={href} as={as} passHref>
                <NavigationLink
                    isActive={router.asPath === as}
                    isHovered={isHovered}
                    {...containerProps}
                >
                    {name}
                </NavigationLink>
            </Link>
        </ListItem>
    );
}

SearchNavigationLink.propTypes = {
    as: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};