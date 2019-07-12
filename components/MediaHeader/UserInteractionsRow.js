import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Star, StarHalfAlt, Bookmark, Heart, List } from 'styled-icons/fa-solid';
import { Star as StarEmpty } from 'styled-icons/fa-regular';
import { connect } from 'react-redux';
import { markFavourite, editWatchlist } from '../../actions';
import ReactToolTip from 'react-tooltip';

const IconContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
    ${({ isHovered }) => isHovered && 'background: #fff;'}
    transition: background ease-out 0.2s;
    cursor: pointer;
`;

const RateIcon = styled(Star)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const ListIcon = styled(List)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const WatchlistIcon = styled(Bookmark)`
    width: 10px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const FavouriteIcon = styled(Heart)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

const StyledUserInteractionsRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    max-width: 250px;
`;

function Icon({ handleClick, isBeingUsed, inUseColor, tooltipText, children }) {

    const [ isHovered, setIsHovered ] = useState(false);

    const iconColor = isBeingUsed 
                    ? inUseColor
                    : isHovered
                        ? '#222'
                        : '#fff';

    return (
        <>
            <IconContainer
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                isHovered={isHovered}
                onClick={handleClick}
                data-tip={tooltipText}
            >
                {children({
                    iconColor
                })}
            </IconContainer>
        </>
    );
}

Icon.propTypes = {
    handleClick: PropTypes.func,
    isBeingUsed: PropTypes.bool,
    inUseColor: PropTypes.string,
    tooltipText: PropTypes.string
};


function UserInteractionsRow({ accountStates, mediaType, mediaId, markFavourite, editWatchlist }) {
    //#dc1f3b
    return (
        <StyledUserInteractionsRow>
            <Icon
                isBeingUsed={false}
                handleClick={() => {}}
                inUseColor="#fff"
                tooltipText="Add to list"
            >
                {({ iconColor }) => <ListIcon iconColor={iconColor} />}
            </Icon>
            <Icon
                isBeingUsed={accountStates.favorite}
                handleClick={() => markFavourite(mediaType, mediaId, !accountStates.favorite)}
                inUseColor="#dc1f3b"
                tooltipText={accountStates.favorite ? 'Remove from your favourites' : 'Mark as favourite'}
            >
                {({ iconColor }) => <FavouriteIcon iconColor={iconColor} />}
            </Icon>
            <Icon
                isBeingUsed={accountStates.watchlist}
                handleClick={() => editWatchlist(mediaType, mediaId, !accountStates.watchlist)}
                inUseColor="#43cbe8"
                tooltipText={accountStates.watchlist ? 'Remove from your watchlist' : 'Add to your watchlist'}
            >
                {({ iconColor }) => <WatchlistIcon iconColor={iconColor} />}
            </Icon>
            <Icon
                isBeingUsed={Boolean(accountStates.rated)}
                handleClick={() => {}}
                inUseColor="#f58a0b"
                tooltipText={Boolean(accountStates.rated) ? `Rated ${accountStates.rated.value}` : 'Rate it!'}
            >
                {({ iconColor }) => <RateIcon iconColor={iconColor} />}
            </Icon>
            <ReactToolTip 
                type="light"
                place="bottom"
                effect="solid"
                className="custom-tooltip"
            />
        </StyledUserInteractionsRow>
    );
}

UserInteractionsRow.propTypes = {
    accountStates: PropTypes.shape({
        favorite: PropTypes.bool,
        rated: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                value: PropTypes.number
            })
        ]),
        watchlist: PropTypes.bool,
    }),
    mediaType: PropTypes.oneOf(['movie', 'tv']),
    mediaId: PropTypes.number,
};

export default connect(undefined, { markFavourite, editWatchlist })(UserInteractionsRow);