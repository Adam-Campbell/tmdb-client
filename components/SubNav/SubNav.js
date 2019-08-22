import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Layout';
import Link from 'next/link';
import { text } from '../../utils';
import SubNavLink from './SubNavLink';

const SubNavContainer = styled.div`
    background: ${({ theme }) => theme.colors.primary};
`;

const StyledSubNav = styled(Row)`
    overflow-x: auto;
    display: flex;
    justify-content: ${({ alignCenter }) => alignCenter ? 'center' : 'flex-start'};
`;

const SubNavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    display: flex;
    max-width: 100%;
    ${({ alignCenter }) => alignCenter || `
        flex-grow: 1;
        justify-content: space-between;
    `}
`;

const SubNavItem = styled.li`
    flex-shrink: 0;
    & + & {
        margin-left: ${({ theme }) => theme.getSpacing(2)};
    }
`;

export function SubNav({ navData, alignCenter }) {

    return (
        <SubNavContainer>
            <StyledSubNav as="nav" alignCenter={alignCenter}>
                <SubNavList alignCenter={alignCenter}>
                    {navData.map(item => (
                        <SubNavItem key={item.name}>
                            <SubNavLink
                                as={item.as}
                                href={item.href}
                                name={item.name}
                            />
                        </SubNavItem>
                    ))}
                </SubNavList>
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
    alignCenter: PropTypes.bool
};
