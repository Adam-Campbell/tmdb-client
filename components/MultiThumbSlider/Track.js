import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTrack = styled.div`
    position: absolute;
    height: 10px;
    z-index: 5;
    top: 50%;
    transform: translateY(-50%);
    background: #546C91;
    border-radius: 5px;
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