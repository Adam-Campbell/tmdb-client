import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Link from 'next/link';
import {
    Username,
    UserMenuList,
    ProfileLink,
    LogoutButton
} from './userMenuElements';

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
            className={{
                base: 'user-menu-modal__content-container',
                afterOpen: 'user-menu-modal__content-container--after-open',
                beforeClose: 'user-menu-modal__content-container--before-close'
            }}
            closeTimeoutMS={200}
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
                    background: 'none',
                    zIndex: 3000
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
