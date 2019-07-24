import React, { useState } from 'react';
import styled from 'styled-components';
import { NavItem, NavAnchor } from './commonElements';
import { text } from '../../utils';
import Link from 'next/link';

const SubNavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    background: #43cbe8;
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    flex-direction: column;
    @media (min-width: 768px) {
        position: absolute;
        top: 50px;
    }
`;

const SubNavItem = styled.li`
    display: inline-block;
    flex-shrink: 0;
`;

const SubNavAnchor = styled.a`
    display: block;
    ${text('body', { fontWeight: 700, color: '#fff' })}
    cursor: pointer;
    text-decoration: none;
    border-radius: 3px;
    padding: 20px;
    background: transparent;
    transition: background ease-out 0.2s;
    &:hover {
        background: rgba(220,220,220,0.2);
    }
    @media (min-width: 768px) {
        padding: 10px;
        font-weight: 400;
    }
`;

export default function SubNav({ name, subNavData, activeRoute, route }) {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <NavItem
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <NavAnchor 
                as="span"
                isActive={activeRoute === route}
                onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(prev => !prev)
                }}
            >{name}</NavAnchor>
            <SubNavList isOpen={isOpen}>
                {subNavData.map((el, index) => (
                   <SubNavItem key={index}>
                        <Link href={el.href} as={el.as}>
                            <SubNavAnchor>
                                {el.name}
                            </SubNavAnchor>
                        </Link>
                   </SubNavItem> 
                ))}
            </SubNavList>
        </NavItem>
    );
}