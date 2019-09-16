import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FacebookSquare, TwitterSquare, Instagram } from 'styled-icons/fa-brands';
import { Link } from 'styled-icons/fa-solid';

const StyledSocialLinks = styled.ul`
    list-style-type: none;
    padding-left: 0;
    display: flex;
    align-items: center;
`;

const ListItem = styled.li`
    display: inline-block;
    & + & {
        margin-left: ${({ theme }) => theme.getSpacing(3)};
    }
`;

const StyledFacebook = styled(FacebookSquare)`
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

const StyledTwitter = styled(TwitterSquare)`
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

const StyledInstagram = styled(Instagram)`
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

const StyledExternal = styled(Link)`
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

export function SocialLinks({ facebook, twitter, instagram, website }) {

    if (!facebook && !twitter && !instagram && !website) return null;

    return (
        <StyledSocialLinks>
            {facebook && (
                <ListItem>
                    <a data-testid="facebook" href={`https://facebook.com/${facebook}`} target="blank">
                        <StyledFacebook />
                    </a>
                </ListItem>
            )}
            {twitter && (
                <ListItem>
                    <a data-testid="twitter" href={`https://twitter.com/${twitter}`} target="blank">
                        <StyledTwitter />
                    </a>
                </ListItem>
            )}
            {instagram && (
                <ListItem>
                    <a data-testid="instagram" href={`https://instagram.com/${instagram}`} target="blank">
                        <StyledInstagram />
                    </a>
                </ListItem>
            )}
            {website && (
                <ListItem>
                    <a data-testid="website" href={website} target="blank">
                        <StyledExternal />
                    </a>
                </ListItem>
            )}
        </StyledSocialLinks>
    );
}

SocialLinks.propTypes = {
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    website: PropTypes.string
};
