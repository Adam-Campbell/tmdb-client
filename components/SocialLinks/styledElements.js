import styled from 'styled-components';
import { FacebookSquare, TwitterSquare, Instagram } from 'styled-icons/fa-brands';
import { Link } from 'styled-icons/fa-solid';

export const StyledSocialLinks = styled.ul`
    list-style-type: none;
    padding-left: 0;
    display: flex;
    align-items: center;
`;

export const ListItem = styled.li`
    display: inline-block;
    & + & {
        margin-left: ${({ theme }) => theme.getSpacing(3)};
    }
`;

export const StyledFacebook = styled(FacebookSquare)`
    color: ${({ theme }) => theme.colors.black};
    width: 25px;
    max-height: 30px;
    transform: scale(1);
    transition: all 0.2s ease-out;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        transform: scale(1.1);
    }
`;

export const StyledTwitter = styled(TwitterSquare)`
    color: ${({ theme }) => theme.colors.black};
    width: 25px;
    max-height: 30px;
    transform: scale(1);
    transition: all 0.2s ease-out;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        transform: scale(1.1);
    }
`;

export const StyledInstagram = styled(Instagram)`
    color: ${({ theme }) => theme.colors.black};
    width: 25px;
    max-height: 30px;
    transform: scale(1);
    transition: all 0.2s ease-out;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        transform: scale(1.1);
    }
`;

export const StyledExternal = styled(Link)`
    color: ${({ theme }) => theme.colors.black};
    width: 25px;
    max-height: 30px;
    transform: scale(1);
    transition: all 0.2s ease-out;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        transform: scale(1.1);
    }
`;
