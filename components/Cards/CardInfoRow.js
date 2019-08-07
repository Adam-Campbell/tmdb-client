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
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleAnchor = styled.a`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: 0.85rem;
    text-decoration: none;
    margin-bottom: ${({ theme }) => theme.getSpacing(1)};
    &:hover {
        text-decoration: underline;
    }
    @media (min-width: 550px) {
        font-size: 1rem;
    }
    ${({ isInline }) => isInline || `
        @media (min-width: 900px) {
            font-size: 1.125rem;
        }
    `}
`;

const ReleaseDate = styled.span`
    ${text('body', { fontWeight: 300, fontSize: '0.85rem' })}
    ${({ theme }) => theme.fontStacks.body()}
    font-size: 0.85rem;
`;

const RatingContainer = styled.div`
    width: 46px;
    height: 46px;
    margin-right: ${({ theme }) => theme.getSpacing(3)};
    flex-shrink: 0;
`;

const CardInfoRow = ({ rating, title, releaseDate, id, urlSubpath, isInline }) => (
    <StyledInfoRow>
        <RatingContainer>
            <Rating rating={rating} />
        </RatingContainer>
        <TextContainer>
            <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
                <TitleAnchor isInline={isInline}>{title}</TitleAnchor>
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
    urlSubpath: PropTypes.string.isRequired,
    isInline: PropTypes.bool
};

export default CardInfoRow;
