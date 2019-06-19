import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDateString } from '../../utils';
import Rating from '../Rating';

/*
    This component is purely for internal use - it forms part of the various card components that are
    exported from this folder, however it should never be imported directly from anywhere else in the
    application.
*/

const StyledInfoRow = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleAnchor = styled.a`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: #222;
    text-decoration: none;
    margin-bottom: 5px;
    &:hover {
        text-decoration: underline;
    }
    @media(min-width: 550px) {
        font-size: 1rem;
    }
`;

const ReleaseDate = styled.span`
    font-family: sans-serif;
    font-weight: 300;
    color: #222;
    font-size: 0.75rem;
    @media(min-width: 550px) {
        font-size: 0.85rem;
    } 
`;

const CardInfoRow = ({ rating, title, releaseDate, id, urlSubpath }) => (
    <StyledInfoRow>
        <Rating rating={rating} />
        <TextContainer>
            <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                <TitleAnchor>{title}</TitleAnchor>
            </Link>
            <ReleaseDate>{formatDateString(releaseDate)}</ReleaseDate>
        </TextContainer>
    </StyledInfoRow>
);

CardInfoRow.propTypes = {
    rating: PropTypes.number,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    urlSubpath: PropTypes.string.isRequired
};

export default CardInfoRow;
