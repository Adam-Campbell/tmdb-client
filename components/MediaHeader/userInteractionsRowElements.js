import styled from 'styled-components';
import { Star, Bookmark, Heart, List } from 'styled-icons/fa-solid';

export const RateIcon = styled(Star)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

export const ListIcon = styled(List)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

export const WatchlistIcon = styled(Bookmark)`
    width: 10px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

export const FavouriteIcon = styled(Heart)`
    width: 15px;
    color: ${({ iconColor }) => iconColor};
    transition: color ease-out 0.2s;
`;

export const StyledUserInteractionsRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    max-width: ${({ includesAllButtons }) => includesAllButtons ? '250px' : '188px'};
`;
