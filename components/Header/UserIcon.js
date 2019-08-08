import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import usePopup from '../usePopup';
import { connect } from 'react-redux';
import { getUserSummary } from '../../reducers/user';
import { text } from '../../utils';
import UserMenu from './UserMenu';
import { logoutUser } from '../../actions';

const StyledUserIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
    margin-left: auto;
    flex-shrink: 0;
    cursor: pointer;
    ${({ theme }) => theme.fontStacks.heading({ useLight: true })}
    font-size: ${({ theme }) => theme.fontSizes.heading.sm};
`;

function UserIcon({ username, logoutUser }) {

    const userInitial = username.charAt(0);

    const { 
        isShowingPopup,
        windowTopOffset,
        popupX,
        popupY,
        anchorEl,
        openPopup,
        closePopup
    } = usePopup({ popupWidth: 150, popupHeight: 110, popupAlignment: 'BOTTOM' });

    return (
        <>
            <StyledUserIcon 
                ref={anchorEl}
                onClick={isShowingPopup ? closePopup : openPopup}
            >{userInitial}</StyledUserIcon>
            <UserMenu 
                isShowingModal={isShowingPopup}
                closeModal={closePopup}
                posX={popupX}
                posY={popupY}
                topOffset={windowTopOffset}
                username={username}
                logoutUser={logoutUser}
            />
        </>
    );
}

function mapState(state) {
    const u = getUserSummary(state);
    return {
        username: u.username || u.name
    }
}

export default connect(mapState, { logoutUser })(UserIcon);