import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Row } from '../Layout';
import { connect } from 'react-redux';
import { getHasSession } from '../../reducers/sessionReducer';
import { logoutUser } from '../../actions';
import { text } from '../../utils';
import Nav from './Nav';
import { Menu } from 'styled-icons/material';
import UserIcon from './UserIcon';
import { Button } from '../Buttons';
import { a } from '../../axiosClient';
import SearchBar from '../SearchBar';
import LoadingBar from '../LoadingBar';
 
const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 3000;
`;

const NavRowWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.complimentary};
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
    margin-top: -4px;
`;

const LoginButton = styled(Button)`
    margin-left: auto;
`;

const MenuToggleButton = styled.button`
    color: ${({ theme }) => theme.colors.white};
    background: none;
    outline: 0;
    border: none;
    cursor: pointer;
    padding: 0;
    &:focus {
        color: ${({ theme }) => theme.colors.primary};
    }
    @media (min-width: 768px) {
        display: none;
    }
`;

const MenuToggleIcon = styled(Menu)`
    width: 32px;
    cursor: pointer;
    margin-top: -4px;
`;

async function handleLoginClick() {
    try { 
        const response = await a.get('api/token');
        const requestToken = response.data.request_token;
        //window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticate`;
        window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.ROOT_URL}authenticate`;
    } catch (error) {
        console.log(error);
    }
}

function Header({ isLoggedIn }) { 

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <StyledHeader>
                <LoadingBar />
                <NavRowWrapper>
                    <NavRow>
                        <MenuToggleButton
                            onClick={() => setIsOpen(true)} 
                        >
                            <MenuToggleIcon />
                        </MenuToggleButton>
                        <Nav 
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                        {
                            isLoggedIn ?
                            <UserIcon /> :
                            <LoginButton onClick={handleLoginClick}>Login</LoginButton>
                        }
                    </NavRow>
                </NavRowWrapper>
                <SearchBar />
        </StyledHeader>
    );
}

const mapState = (state) => ({
    isLoggedIn: getHasSession(state)
});

export const ConnectedHeader = connect(mapState, {
    logoutUser
})(Header);
