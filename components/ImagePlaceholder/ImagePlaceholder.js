import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Person, Tv } from 'styled-icons/material';

const StyledImagePlaceholder = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PersonIcon = styled(Person)`
    color: #222;
    min-width: 32px;
    width: ${({ isLandscape }) => isLandscape ? '25%' : '50%'};
`;

const MediaIcon = styled(Tv)`
    color: #222;
    min-width: 32px;
    width: ${({ isLandscape }) => isLandscape ? '25%' : '50%'};
`;

export function ImagePlaceholder({ isPersonImage, isLandscape }) {
    return (
        <StyledImagePlaceholder>
            {isPersonImage ? (
                <PersonIcon Landscape={isLandscape} />
            ) : (
                <MediaIcon isLandscape={isLandscape} />
            )}
        </StyledImagePlaceholder>
    );
}

ImagePlaceholder.propTypes = {
    isPersonImage: PropTypes.bool,
    isLandscape: PropTypes.bool
};
