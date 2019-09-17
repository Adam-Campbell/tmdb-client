import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import { 
    imageSizeConstants, 
    formatDateString 
} from '../../utils';
import PeopleList from '../PeopleList';
import { EpisodeRatingButton } from '../Buttons';
import {
    StyledEpisodePod,
    MainInfoCard,
    EpisodeImageContainer,
    EpisodeImage,
    TitleRow,
    EpisodeRatingContainer,
    EpisodeTitle,
    AirDate,
    Overview,
    ToggleExpandedRow,
    ToggleExpandedButton,
    ToggleText,
    ToggleIcon,
    AdditionalInfoContainer
} from './styledElements';

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
    averageRating,
    userRating,
    hasSession
}) {

    const [ isExpanded, setExpanded ] = useState(false);

    function handleToggleClick() {
        setExpanded(prev => !prev);
    }

    return (
        <StyledEpisodePod>
            <MainInfoCard>
                <EpisodeImage
                    imagePath={stillPath}
                    imageSize={imageSizeConstants.w780}
                    alt={name}
                    isLandscape={true}
                />
                <div>
                    <TitleRow>
                        <EpisodeRatingContainer>
                            <Rating rating={averageRating} />
                        </EpisodeRatingContainer>
                        {hasSession && (
                            <EpisodeRatingButton 
                                showId={showId}
                                seasonNumber={seasonNumber}
                                episodeNumber={episodeNumber}
                                userRating={userRating}
                            />
                        )}
                        <div>
                            <EpisodeTitle>{episodeNumber}. {name}</EpisodeTitle>
                            <AirDate>{formatDateString(airDate)}</AirDate>
                        </div>
                    </TitleRow>
                    <Overview>
                        {overview || 'There is no overview for this episode'}
                    </Overview>
                </div>
            </MainInfoCard>
            <AdditionalInfoContainer isHidden={!isExpanded}>
                <PeopleList 
                    title="Guest Stars"
                    people={guestStars}
                    shouldAllowExpansion={false}
                />
            </AdditionalInfoContainer>
            <ToggleExpandedRow>
                <ToggleExpandedButton
                    onClick={handleToggleClick}
                >
                    <ToggleText>{isExpanded ? 'Show less' : 'Show more'}</ToggleText>
                    <ToggleIcon isExpanded={isExpanded}/>
                </ToggleExpandedButton>
            </ToggleExpandedRow>
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
    averageRating: PropTypes.number.isRequired,
    userRating: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            value: PropTypes.number
        })
    ]).isRequired,
    hasSession: PropTypes.bool
}
