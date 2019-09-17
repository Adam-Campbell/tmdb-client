import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from '../Rating';
import { getUserSummary, getUsersRatings } from '../../reducers/user';
import {
    StyledUserHeader,
    HeaderRow,
    UserIcon,
    Username,
    UsernameRow,
    RatingStatsRow,
    RatingChartContainer,
    RatingItem,
    RatingDescription,
    RatingItemSeparator
} from './styledElements';

export function getAverageRating(ratingsArr) {
    const numberOfRatings = ratingsArr.length;
    const total = ratingsArr.reduce((acc, mediaObject) => (acc + mediaObject.rating), 0);
    return total / numberOfRatings;
}

export function UserHeader({ username, ratings }) {

    const averageMovieRating = useMemo(() => {
        return getAverageRating(ratings.movies)
    }, [ ratings ]);

    const averageShowRating = useMemo(() => {
        return getAverageRating(ratings.shows)
    }, [ ratings ]);

    const userInitial = username.charAt(0);
    
    return (
        <StyledUserHeader>
            <HeaderRow>
                <UsernameRow>
                    <UserIcon data-testid="user-icon">{userInitial}</UserIcon>
                    <Username>{username}</Username>
                </UsernameRow>
                <RatingStatsRow>
                    <RatingItem>
                        <RatingChartContainer>
                            <Rating rating={averageMovieRating} />
                        </RatingChartContainer>
                        <RatingDescription>Average <br/> Movie Score</RatingDescription>
                    </RatingItem>
                    <RatingItemSeparator />
                    <RatingItem>
                        <RatingChartContainer>
                            <Rating rating={averageShowRating} />
                        </RatingChartContainer>
                        <RatingDescription>Average <br/> TV Score</RatingDescription>
                    </RatingItem>
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
