import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Person, Tv } from 'styled-icons/material';
import { cover } from 'polished';

const StyledImagePlaceholder = styled.div`
    ${cover()}
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.uiSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PersonIcon = styled(Person)`
    color: ${({ theme }) => theme.colors.black};
    min-width: 32px;
    width: ${({ isLandscape }) => isLandscape ? '25%' : '50%'};
`;

const MediaIcon = styled(Tv)`
    color: ${({ theme }) => theme.colors.black};
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
