import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTrack = styled.div`
    position: absolute;
    height: 6px;
    z-index: 5;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
`;

export default function Track({ source, target, getTrackProps }) {
    return (
        <StyledTrack 
            style={{
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`
            }}
            {...getTrackProps()}
        />
    );
}

Track.propTypes = {

};