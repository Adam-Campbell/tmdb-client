import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import CardInfoRow from './CardInfoRow';
import { getImageUrl, imageSizeConstants } from '../../utils';

/*
    How to approach smaller viewport widths:

    Try and keep the same layout - make the poster image smaller (about 100px) wide, which should leave around
    200px for the text in the worst case scenario. If this isn't feasible however, we can try putting the
    poster image and title side by side and the blurb underneath (at small viewports only) or we could just hide 
    the blurb altogether at small viewports. 

    Investigate using word wrap as well - will quite probably need to truncate more of the text at smaller
    viewport widths. 
*/

const StyledPosterCard = styled.div`
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    @media(min-width: 550px) {
        align-items: flex-start;
    }
    @media(min-width: 768px) {
        width: calc(50% - 10px);
    }
`;

const PosterImageLink = styled.a`
    position: relative;
    display: flex;
`;

const PosterImage = styled.img`
    width: 100px;
    height: 150.3px;
    @media(min-width: 360px) {
        width: 130px;
        height: 195.4px;
    }
    @media(min-width: 550px) {
        width: 185px;
        height: 278px;
    }
`;

const PosterImageOverlay = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: background ease-out 0.2s;
    cursor: pointer;
    &:hover {
        background: rgba(17,17,17,0.4)
    }
`;

const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
`;

const OverviewText = styled.p`
    font-family: sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    color: #222;
    margin-left: 10px;
    margin-right: 10px;
    @media(min-width: 550px) {
        font-size: 0.85rem;
    }
`;

const MoreInfoRow = styled.div`
    display: none;
    border-top: solid 1px #ddd;
    padding: 10px;
    margin-top: auto;
    @media(min-width: 550px) {
        display: block;
    }
`;

const MoreInfoAnchor = styled.a`
    font-family: sans-serif;
    font-weight: 400;
    color: #222;
    font-size: 0.85rem;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;


export function PosterCard({ id, title, releaseDate, averageRating, posterPath, overview }) {
    const posterSrc = getImageUrl(posterPath, imageSizeConstants.w185);
    // 213
    const truncatedOverview = overview.slice(0, 150) + '...';
    return (
        <StyledPosterCard>
            <Link href="/" passHref>
                <PosterImageLink>
                    <PosterImage src={posterSrc} alt="" />
                    <PosterImageOverlay />
                </PosterImageLink>
            </Link>
            <TextColumn>
                <CardInfoRow 
                    title={title}
                    releaseDate={releaseDate}
                    rating={averageRating}
                />
                <OverviewText>
                    {truncatedOverview}
                </OverviewText>
                <MoreInfoRow>
                    <Link href="/" passHref>
                        <MoreInfoAnchor>
                            More Info
                        </MoreInfoAnchor>
                    </Link>
                </MoreInfoRow>
            </TextColumn>
        </StyledPosterCard>
    );
}

PosterCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    averageRating: PropTypes.number,
    posterPath: PropTypes.string,
    overview: PropTypes.string.isRequired
};
