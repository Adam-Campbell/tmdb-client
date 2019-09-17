import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledSocialLinks,
    ListItem,
    StyledFacebook,
    StyledTwitter,
    StyledInstagram,
    StyledExternal
} from './styledElements';

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
