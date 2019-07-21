import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Rating from '../Rating';
import { 
    text, 
    getImageUrl, 
    imageSizeConstants, 
    formatDateString 
} from '../../utils';

const StyledEpisodePod = styled.div`
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const MainInfoCard = styled.div`

`;

const EpisodeImage = styled.img`

`;

const InfoCol = styled.div`

`;

const TitleRow = styled.div`

`;

const EpisodeRatingContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const EpisodeTitle = styled.h3`

`;

const AirDate = styled.p`

`;

const Overview = styled.p`

`;

export function EpisodePod({
    airDate,
    episodeNumber,
    guestStars,
    id,
    name,
    overview,
    seasonNumber,
    showId,
    stillPath,
    averageRating
}) {

    const stillSrc = getImageUrl(stillPath, imageSizeConstants.w780); 

    return (
        <StyledEpisodePod>
            <MainInfoCard>
                <EpisodeImage
                    src={stillSrc}
                    alt={name}
                />
                <InfoCol>
                    <TitleRow>
                        <EpisodeRatingContainer>
                            <Rating rating={averageRating} />
                        </EpisodeRatingContainer>
                        <div>
                            <EpisodeTitle>{episodeNumber}. {name}</EpisodeTitle>
                            <AirDate>{formatDateString(airDate)}</AirDate>
                        </div>
                    </TitleRow>
                    <Overview>
                        {overview}
                    </Overview>
                </InfoCol>
            </MainInfoCard>
        </StyledEpisodePod>
    );
}

EpisodePod.propTypes = {
    airDate: PropTypes.string.isRequired,
    episodeNumber: PropTypes.number.isRequired,
    guestStars: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    seasonNumber: PropTypes.number.isRequired,
    showId: PropTypes.number.isRequired,
    stillPath: PropTypes.string.isRequired,
    averageRating: PropTypes.number.isRequired
}