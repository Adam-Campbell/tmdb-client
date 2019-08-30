import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NavItem } from './commonElements';
import SubNavToggleLink from './SubNavToggleLink';
import SubNavLink from './SubNavLink';

const SubNavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    background: ${({ theme }) => theme.colors.complimentary};
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    flex-direction: column;
    z-index: 4000;
    @media (min-width: 768px) {
        position: absolute;
        top: 50px;
        background: ${({ theme }) => theme.colors.primary};
    }
`;

const SubNavItem = styled.li`
    display: inline-block;
    flex-shrink: 0;
`;

export default function SubNav({ name, route, subNavData, icon }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const router = useRouter();

    return (
        <NavItem
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <SubNavToggleLink 
                route={route}
                name={name}
                icon={icon}
                setIsOpen={setIsOpen}
            />
            <SubNavList isOpen={isOpen}>
                {subNavData.map((el, idx) => (
                   <SubNavItem key={idx}>
                        <SubNavLink 
                            as={el.as}
                            href={el.href}
                            name={el.name}
                            handleBlur={
                                idx === subNavData.length - 1 ? 
                                () => setIsOpen(false) :
                                undefined
                            }
                        />
                   </SubNavItem> 
                ))}
            </SubNavList>
        </NavItem>
    );
}

SubNav.propTypes = {
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    subNavData: PropTypes.arrayOf(PropTypes.object).isRequired,
    icon: PropTypes.oneOf([
        'home', 
        'discover',
        'movies', 
        'tv', 
        'people' 
    ]).isRequired
};