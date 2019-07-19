import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import Link from 'next/link';
import { text } from '../../utils';

/*

[
    {
        name: {String} - the name of the route being linked to
        href: {String} - the actual url being linked to
        as: {String} - the prettified url that displays in the browser
    }
]

*/

const SubNavContainer = styled.div`
    background: rebeccapurple;
`;


const StyledSubNav = styled(Row)`
    overflow-x: auto;
    display: flex;
    justify-content: ${({ alignLeft }) => alignLeft ? 'flex-start' : 'center'};
`;

const NavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    max-width: 100%;
`;

const NavItem = styled.li`
    padding: 5px;
    flex-shrink: 0;
    @media (min-width: 768px) {
        padding: 5px 10px;
    }
`;

const NavLink = styled.a`
    ${text('body', { color: '#fff', fontWeight: 700 })}
    padding: 10px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        color: #ddd;
    }
`;

export function SubNav({ navData, alignLeft }) {
    return (
        <SubNavContainer>
            <StyledSubNav as="nav" alignLeft={alignLeft}>
                <NavList>
                    {navData.map(item => (
                        <NavItem key={item.name}>
                            <Link href={item.href} as={item.as} passHref>
                                <NavLink>{item.name}</NavLink>
                            </Link>
                        </NavItem>
                    ))}
                </NavList>
            </StyledSubNav>
        </SubNavContainer>
    );
}

SubNav.propTypes = {
    navData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        as: PropTypes.string.isRequired
    })).isRequired,
    alignLeft: PropTypes.bool
};

