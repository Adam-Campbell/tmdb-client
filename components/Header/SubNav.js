import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NavItem } from './commonElements';
import SubNavToggle from './SubNavToggle';
import SubNavLink from './SubNavLink';

const SubNavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    background: #1a435d;
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    flex-direction: column;
    @media (min-width: 768px) {
        position: absolute;
        top: 50px;
        background: #43cbe8;
    }
`;

const SubNavItem = styled.li`
    display: inline-block;
    flex-shrink: 0;
`;

export default function SubNav({ name, route, subNavData }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const router = useRouter();

    return (
        <NavItem
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <SubNavToggle 
                route={route}
                name={name}
                handleTouch={() => setIsOpen(prev => !prev)}
            />
            <SubNavList isOpen={isOpen}>
                {subNavData.map((el, index) => (
                   <SubNavItem key={index}>
                        <SubNavLink 
                            as={el.as}
                            href={el.href}
                            name={el.name}
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
};