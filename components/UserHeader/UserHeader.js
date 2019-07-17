import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Rating from '../Rating';
import { getUserSummary, getUsersRatings } from '../../reducers/user';
import { text } from '../../utils';
import { Row } from '../Layout';

/*

const deepRed = '#dc1f3b';
const orange = '#f58a0b';
const limeGreen = '#6ee843';
const lightBlue = '#43cbe8';
const darkBlue = '#1a435d';
const blueGrey = '#3a5b6f';

*/

// background: linear-gradient(135deg, #1a435d, #3a5b6f);

const StyledUserHeader = styled.div`
    background: linear-gradient(135deg, #3a5b6f, #1a435d);
    padding-top: 40px;
    padding-bottom: 40px;
    overflow-x: hidden;
`;

const HeaderRow = styled(Row)`
    position: relative;
`;

const UserIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #43cbe8;
    text-transform: uppercase;
    margin-right: 20px;
    flex-shrink: 0;
    ${text('heading', { color: '#fff', fontSize: '2.25rem' })}
    @media (min-width: 768px) {
        width: 150px;
        height: 150px;
        font-size: 3.25rem;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Username = styled.h2`
    ${text('heading', { color: '#fff', fontSize: '1.5rem' })}
    margin-top: 0;
    @media (min-width: 768px) {
        font-size: 2.25rem;
    }
`;

const UsernameRow = styled.div`
    display: flex;
    align-items: center;
    @media (min-width: 768px) {
        display: block;
        margin-left: 200px;
    }
`;

const RatingStatsRow = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: 768px) {
        margin-left: 200px;
        justify-content: flex-start;
    }
`;

export function UserHeader({ username, ratings }) {
    const userInitial = username.charAt(0);
    return (
        <StyledUserHeader>
            <HeaderRow>
                
                
                    <UsernameRow>
                        <UserIcon>{userInitial}</UserIcon>
                        <Username>{username}</Username>
                    </UsernameRow>
                    <RatingStatsRow>
                        <Rating rating={7} baseSize={70} />
                        <Rating rating={8} baseSize={70} />
                    </RatingStatsRow>
                
            </HeaderRow>
        </StyledUserHeader>
    );
}

function mapState(state) {
    const summary = getUserSummary(state);
    const ratings = getUsersRatings(state);
    return {
        username: summary.username || summary.name,
        ratings
    }
}

export const ConnectedUserHeader = connect(mapState)(UserHeader);
