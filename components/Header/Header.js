import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Row } from '../Layout';
import { connect } from 'react-redux';
import { getSessionType, getUserSessionId } from '../../reducers/sessionReducer';
import { logoutUser } from '../../actions';
import { getRequestToken } from '../../Api';
import { text } from '../../utils';

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
    },
    {
        as: '/me',
        href: '/me',
        text: 'Me'
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
    display: flex;
    align-items: center;
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

const AccountButton = styled.button`
    ${text('body', { color: '#fff', fontWeight: 700 })}
    cursor: pointer;
    padding: 10px;
    border-radius: 3px;
    border: none;
    background: ${({ warning }) => warning ? 'tomato' : '#17c17b'};
    margin-left: auto;
`;

async function handleLoginClick() {
    const requestToken = await getRequestToken();
    window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticate`
}

const Header = (props) => (
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
                {
                    props.isLoggedIn ? 
                    <AccountButton warning onClick={props.logoutUser}>Logout</AccountButton> :
                    <AccountButton onClick={handleLoginClick}>Login</AccountButton>
                }
            </NavContainer>
        </Row>
    </StyledHeader>
);

const mapState = (state) => ({
    isLoggedIn: getSessionType(state) === 'USER',
    userSessionId: getUserSessionId(state)
});

export const ConnectedHeader = connect(mapState, {
    logoutUser
})(Header);