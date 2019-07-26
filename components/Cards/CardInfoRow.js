import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDateString, text } from '../../utils';
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
    ${text('body', { fontWeight: 700, fontSize: '0.85rem' })}
    text-decoration: none;
    margin-bottom: 5px;
    &:hover {
        text-decoration: underline;
    }
    @media (min-width: 550px) {
        font-size: 1rem;
    }
    @media (min-width: 900px) {
        font-size: 1.125rem;
    }
`;

const ReleaseDate = styled.span`
    ${text('body', { fontWeight: 300, fontSize: '0.85rem' })}
    @media(min-width: 550px) {
        font-size: 0.85rem;
    } 
`;

const RatingContainer = styled.div`
    width: 46px;
    height: 46px;
    margin-right: 20px;
    flex-shrink: 0;
`;

const CardInfoRow = ({ rating, title, releaseDate, id, urlSubpath }) => (
    <StyledInfoRow>
        <RatingContainer>
            <Rating rating={rating} />
        </RatingContainer>
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
