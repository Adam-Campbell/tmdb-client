import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Row } from '../Layout';

const navData = [
	{
		as: '/',
		href: '/',
		text: 'Home'
	},
	{
		as: '/discover',
		href: '/discover',
		text: 'Discover'
	},
	{
		as: '/movies',
		href: '/movies',
		text: 'Movies'
	},
	{
		as: '/tv',
		href: '/tv',
		text: 'TV'
	},
	{
		as: '/people',
		href: '/people',
		text: 'People'
	}
];

const StyledHeader = styled.header`
    background-color: #1a435d;
    padding: 5px 20px;
`;

const NavContainer = styled.div`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const NavList = styled.ul`
    list-style-type: none;
    padding-left: 0;
`;

const NavItem = styled.li`
    display: inline-block;
    & + & {
        margin-left: 10px;
    }
`;

const NavAnchor = styled.a`
    font-family: sans-serif;
    color: white;
    font-weight: 400;
    cursor: pointer;
    border-radius: 3px;
    padding: 10px;
    background: transparent;
    transition: background ease-out 0.2s;
    &:hover {
        background: rgba(220,220,220,0.2);
    }
`;

export const Header = (props) => (
    <StyledHeader>
        <Row>
            <NavContainer>
                <NavList>
                    {navData.map((data, index) => (
                        <NavItem key={index}>
                            <Link as={data.as} href={data.href}>
                                <NavAnchor>{data.text}</NavAnchor>
                            </Link>
                        </NavItem>
                    ))}
                </NavList>
            </NavContainer>
        </Row>
    </StyledHeader>
);