import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCardPlaceholder = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    display: flex;
    padding: ${({ theme }) => theme.getSpacing(3)};
    height: 278px;
    @media (min-width: 900px) {
        height: 331px;
    }
`;

const ImagePlaceholder = styled.div`
    background: ${({ theme }) => theme.colors.uiPrimary};
    width: 159px
    height: 238px;
    @media (min-width: 900px) {
        width: 194px;
        height: 291px;
    }
`;

const TextCol = styled.div`
    margin-left: ${({ theme }) => theme.getSpacing(3)};
    flex: 1;
`;

const TextRow = styled.div`
    background: ${({ theme }) => theme.colors.uiPrimary};
    height: 10px;
    width: ${({ fullWidth }) => fullWidth ? '100%' : '75%'};
    margin-bottom: ${({ theme }) => theme.getSpacing(2)};
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