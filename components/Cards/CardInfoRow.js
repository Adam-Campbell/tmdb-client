import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDateString } from '../../utils';
import Rating from '../Rating';

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
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    text-decoration: none;
    margin-bottom: ${({ theme }) => theme.getSpacing(1)};
    &:hover {
        text-decoration: underline;
    }
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.md};
    }
    ${({ theme, isInline }) => isInline || `
        @media (min-width: 900px) {
            font-size: ${theme.fontSizes.body.lg};
        }
    `}
`;

const ReleaseDate = styled.span`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
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
            <Link href={`${urlSubpath}/[id]`} as={`${urlSubpath}/${id}`} passHref>
                <TitleAnchor isInline={isInline}>{title}</TitleAnchor>
            </Link>
            <ReleaseDate>{formatDateString(releaseDate)}</ReleaseDate>
        </TextContainer>
    </StyledInfoRow>
);

CardInfoRow.propTypes = {
    rating: PropTypes.number,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    id: PropTypes.number.isRequired,
    urlSubpath: PropTypes.string.isRequired,
    isInline: PropTypes.bool
};

export default CardInfoRow;
