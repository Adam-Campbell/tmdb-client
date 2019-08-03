import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoadingIndicator = styled.div`
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
`;

export default function LoadingIndicator({ isLoading }) {
    return isLoading ? (
        <StyledLoadingIndicator>Loading more data...</StyledLoadingIndicator>
    ) : null;
}

LoadingIndicator.propTypes = {
    isLoading: PropTypes.bool.isRequired
};
