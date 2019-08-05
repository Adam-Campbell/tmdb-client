import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCardPlaceholder = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    padding: 20px;
    height: 278px;
    @media (min-width: 900px) {
        height: 331px;
    }
`;

const ImagePlaceholder = styled.div`
    background: #eee;
    width: 159px
    height: 238px;
    @media (min-width: 900px) {
        width: 194px;
        height: 291px;
    }
`;

const TextCol = styled.div`
    margin-left: 20px;
    flex: 1;
`;

const TextRow = styled.div`
    background: #eee;
    height: 10px;
    width: ${({ fullWidth }) => fullWidth ? '100%' : '75%'};
    margin-bottom: 10px;
`;

export default function CardPlaceholder() {
    return (
        <StyledCardPlaceholder>
            <ImagePlaceholder />
            <TextCol>
                <TextRow fullWidth />
                <TextRow fullWidth />
                <TextRow />
                <TextRow />
                <TextRow />
            </TextCol>
        </StyledCardPlaceholder>
    );
}

CardPlaceholder.propTypes = {

};