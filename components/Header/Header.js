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
import UserIcon from './UserIcon';
import { Button } from '../Buttons';
 
const StyledHeader = styled.header`
    background-color: ${({ theme }) => theme.colors.complimentary};
    position: sticky;
    top: 0;
    z-index: 3000;
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

const LoginButton = styled(Button)`
    margin-left: auto;
`;

const MenuToggle = styled(Menu)`
    color: ${({ theme }) => theme.colors.white};
    width: 32px;
    cursor: pointer;
    @media (min-width: 768px) {
        display: none;
    }
`;

async function handleLoginClick() {
    const requestToken = await getRequestToken();
    window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticate`
}

function Header({ isLoggedIn }) { 

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <StyledHeader>
                <NavRow>
                    <Nav isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
                    <MenuToggle onClick={() => setIsOpen(true)} />
                    {
                        isLoggedIn ?
                        <UserIcon /> :
                        <LoginButton onClick={handleLoginClick}>Login</LoginButton>
                    }
                </NavRow>
        </StyledHeader>
    );
}

const mapState = (state) => ({
    isLoggedIn: getSessionType(state) === 'USER'
});

export const ConnectedHeader = connect(mapState, {
    logoutUser
})(Header);
