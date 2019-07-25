import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { text } from '../../utils';
import Link from 'next/link';

const Username = styled.p`
    ${text('body', { fontWeight: 700, fontSize: '0.75rem' })}
    margin: 10px 10px auto 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserMenuList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin: 0;
`;

const ProfileLink = styled.a`
    ${text('body', { fontSize: '0.85rem' })}
    text-decoration: none;
    display: block;
    padding: 10px;
    color: ${({ isHovered }) => isHovered ? '#fff' : '#222'};
    background: ${({ isHovered }) => isHovered ? '#1a435d' : 'none'};
`;

const LogoutButton = styled.button`
    ${text('body', { fontSize: '0.85rem' })}
    background: none;
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    text-align: left;
    color: ${({ isHovered }) => isHovered ? '#fff' : '#222'};
    background: ${({ isHovered }) => isHovered ? '#1a435d' : 'none'};
`;

export default function UserMenu({
    isShowingModal, 
    closeModal, 
    posX, 
    posY, 
    topOffset,
    username,
    logoutUser
}) {

    const [ item1IsHovered, setItem1Hovered ] = useState(false);
    const [ item2IsHovered, setItem2Hovered ] = useState(false);

    useEffect(() => {
        function closeOnScroll() {
            if (isShowingModal) {
                closeModal();
            }
        }
        window.addEventListener('scroll', closeOnScroll);
        return function cleanup() {
            window.removeEventListener('scroll', closeOnScroll);
        }
    }, [isShowingModal, closeModal]);

    return (
        <ReactModal
            isOpen={isShowingModal}
            overlayClassName="rating-modal__overlay"
            className="user-menu-modal__content-container"
            shouldCloseOnEscape={true}
            onRequestClose={closeModal}
            style={{ 
                content: { top: posY, left: posX, width: 150, height: 110 },
                overlay: {
                    position: 'absolute',
                    top: topOffset,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'none'
                  } 
            }}    
        >
            <Username>{username}</Username>
            <UserMenuList>
                <li
                    onMouseEnter={() => setItem1Hovered(true)}
                    onMouseLeave={() => setItem1Hovered(false)}
                >
                    <Link href="/me" as="/me" passHref>
                        <ProfileLink isHovered={item1IsHovered}>View profile</ProfileLink>
                    </Link>
                </li>
                <li
                    onMouseEnter={() => setItem2Hovered(true)}
                    onMouseLeave={() => setItem2Hovered(false)}
                >
                    <LogoutButton 
                        isHovered={item2IsHovered}
                        onClick={logoutUser}
                    >Logout</LogoutButton>
                </li>
            </UserMenuList>
        </ReactModal>
    );
}

UserMenu.propTypes = {
    isShowingModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired, 
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    topOffset: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    logoutUser: PropTypes.func.isRequired
};