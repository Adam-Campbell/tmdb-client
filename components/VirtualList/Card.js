import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #eee;
    border-radius: 3px;
    display: flex;
    align-items: center;
`;

const CardIcon = styled.div`
    width: 60px;
    height: 60px;
    background: #222;
    border-radius: 3px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.75rem;
    color: #fff;
`;

const CardText = styled.p`
    font-family: sans-serif;
    color: #222;
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 0;
`;

export default function Card({ id, description }) {
    return (
        <StyledCard>
            <CardIcon>{id}</CardIcon>
            <CardText>{description}</CardText>
        </StyledCard>
    );
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
};