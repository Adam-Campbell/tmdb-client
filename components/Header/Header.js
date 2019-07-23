import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Row } from '../Layout';
import { connect } from 'react-redux';
import { getSessionType, getUserSessionId } from '../../reducers/sessionReducer';
import { logoutUser } from '../../actions';
import { getRequestToken } from '../../Api';
import { text } from '../../utils';
import Nav from './Nav';
import { Menu } from 'styled-icons/material';

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
    position: relative;
    height: 50px;
    display: flex;
`;

const NavRow = styled(Row)`
    display: flex;
    align-items: center;
`;

const NavContainer = styled.div`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    
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

// const MenuToggle = styled(span)`
//     display: block;
//     width: 32px;
//     height: 32px;
//     border-radius: 3px;
//     border: none;
//     background: #fff;
//     @media (min-width: 768px) {
//         display: none;
//     }
// `;

const MenuToggle = styled(Menu)`
    color: #fff;
    width: 32px;
    cursor: pointer;
    @media (min-width: 768px) {
        display: none;
    }
`;

const UserIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #43cbe8;
    text-transform: uppercase;
    margin-left: auto;
    flex-shrink: 0;
    cursor: pointer;
    ${text('heading', { color: '#fff', fontSize: '1.25rem' })}
`;

async function handleLoginClick() {
    const requestToken = await getRequestToken();
    window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticate`
}



function Header(props) { 

    const [ isOpen, setIsOpen ] = useState(false);



    return (
        <StyledHeader>
                <NavRow>
                    <Nav isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
                    <MenuToggle onClick={() => setIsOpen(true)} />
                    <UserIcon>A</UserIcon>
                </NavRow>
        </StyledHeader>
    );
}

const mapState = (state) => ({
    isLoggedIn: getSessionType(state) === 'USER',
    userSessionId: getUserSessionId(state)
});

export const ConnectedHeader = connect(mapState, {
    logoutUser
})(Header);

/*

{
                        props.isLoggedIn ? 
                        <AccountButton warning onClick={props.logoutUser}>Logout</AccountButton> :
                        <AccountButton onClick={handleLoginClick}>Login</AccountButton>
                    }

*/