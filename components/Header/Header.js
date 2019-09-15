import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Row } from '../Layout';
import { connect } from 'react-redux';
import { getHasSession } from '../../reducers/sessionReducer';
import { logoutUser } from '../../actions';
import { text } from '../../utils';
import Nav from './Nav';
import UserIcon from './UserIcon';
import { Button } from '../Buttons';
import { a } from '../../axiosClient';
import SearchBar from '../SearchBar';
import LoadingBar from '../LoadingBar';
import NavToggleButton from './NavToggleButton';
 
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

async function handleLoginClick() {
    try { 
        const response = await a.get('api/token');
        const requestToken = response.data.request_token;
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
                        <NavToggleButton
                            isOpen={isOpen}
                            handleClick={() => setIsOpen(prev => !prev)} 
                        />
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
