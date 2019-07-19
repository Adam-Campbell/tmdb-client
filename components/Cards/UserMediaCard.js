import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardInfoRow from './CardInfoRow';
import Link from 'next/link';
import { getImageUrl, imageSizeConstants, text, truncateString } from '../../utils';

const StyledUserMediaCard = styled.div`
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
`;

const MainCardContentContainer = styled.div`
    display: flex;
    align-items: center;
    @media(min-width: 550px) {
        align-items: flex-start;
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
    ${text('body', { fontSize: '0.75rem' })}
    margin-left: 10px;
    margin-right: 10px;
    @media(min-width: 550px) {
        font-size: 0.85rem;
    }
`;

const ActionBarContainer = styled.div`
    height: 50px;
    border-top: solid 1px #ddd;
    padding-left: 20px;
    display: flex;
    align-items: center;
`;

export function UserMediaCard({ 
    id, 
    title, 
    releaseDate, 
    averageRating, 
    posterPath, 
    overview, 
    urlSubpath,
    children
}) {

    const posterSrc = getImageUrl(posterPath, imageSizeConstants.w185);
    const truncatedOverview = truncateString(overview, 180);

    return (
        <StyledUserMediaCard>
            <MainCardContentContainer>
                <Link href={`${urlSubpath}?id=${id}`} as={`${urlSubpath}/${id}`} passHref>
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
                        id={id}
                        urlSubpath={urlSubpath}
                    />
                    <OverviewText>
                        {truncatedOverview}
                    </OverviewText>
                </TextColumn>
            </MainCardContentContainer>
            <ActionBarContainer>
                {children}
            </ActionBarContainer>
        </StyledUserMediaCard>
    );
}

UserMediaCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    averageRating: PropTypes.number,
    posterPath: PropTypes.string,
    overview: PropTypes.string.isRequired,
    urlSubpath: PropTypes.string,
};