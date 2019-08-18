import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchNavigationLink from './SearchNavigationLink';
import { Row } from '../Layout';
import { getSearchSubNavData } from '../../utils';

const NavContainer = styled(Row)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: ${({ theme }) => theme.getSpacing(3, 0)};
`;

const NavTitle = styled.h1`
    ${({ theme }) => theme.fontStacks.heading()}
    font-size: ${({ theme }) => theme.fontSizes.heading.md};
    margin: ${({ theme }) => theme.getSpacing(2, 2, 2, 0)};
`;

const Nav = styled.nav`
    margin-top: 5px;
`;

const NavList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding-left: 0;
    display: flex;
`;



export function SearchNavigation({ searchQuery }) {

    const navData = useMemo(() => { 
        return getSearchSubNavData(searchQuery);
    }, [ searchQuery ]);

    return (
        <NavContainer>
            <NavTitle>Search in</NavTitle>
            <Nav>
                <NavList>
                    {navData.map((data, idx) => (
                        <SearchNavigationLink 
                            key={idx}
                            as={data.as}
                            href={data.href}
                            name={data.name}
                        />
                    ))}
                </NavList>
            </Nav>
        </NavContainer>
    );
}

SearchNavigation.propTypes = {
    searchQuery: PropTypes.string.isRequired
};