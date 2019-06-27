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
        margin-left: 15px;
    }
`;

const StyledFacebook = styled(FacebookSquare)`
    color: #222;
    width: 25px;
    &:hover {
        color: #43cbe8;
    }
`;

const StyledTwitter = styled(TwitterSquare)`
    color: #222;
    width: 25px;
    &:hover {
        color: #43cbe8;
    }
`;

const StyledInstagram = styled(Instagram)`
    color: #222;
    width: 25px;
    &:hover {
        color: #43cbe8;
    }
`;

const StyledExternal = styled(Link)`
    color: #222;
    width: 25px;
    &:hover {
        color: #43cbe8;
    }
`;

export function SocialLinks({ facebook, twitter, instagram, website }) {
    return (
        <StyledSocialLinks>
            {facebook && (
                <ListItem>
                    <a href={`https://facebook.com/${facebook}`} target="blank">
                        <StyledFacebook />
                    </a>
                </ListItem>
            )}
            {twitter && (
                <ListItem>
                    <a href={`https://twitter.com/${twitter}`} target="blank">
                        <StyledTwitter />
                    </a>
                </ListItem>
            )}
            {instagram && (
                <ListItem>
                    <a href={`https://instagram.com/${instagram}`} target="blank">
                        <StyledInstagram />
                    </a>
                </ListItem>
            )}
            {website && (
                <ListItem>
                    <a href={website} target="blank">
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
