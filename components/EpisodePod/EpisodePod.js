import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Rating from '../Rating';
import { 
    text, 
    getImageUrl, 
    imageSizeConstants, 
    formatDateString 
} from '../../utils';
import { ChevronDown } from 'styled-icons/fa-solid';
import PeopleList from '../PeopleList';
import { EpisodeRatingButton } from '../Buttons';
import SmartImage from '../SmartImage';

const StyledEpisodePod = styled.div`
    width: 100%;
    margin: ${({ theme }) => theme.getSpacing(3, 0)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: solid 1px ${({ theme }) => theme.colors.uiPrimary};
    background: ${({ theme }) => theme.colors.white};
`;

const MainInfoCard = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const EpisodeImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    flex-shrink: 0;
    @media (min-width: 768px) {
        width: 300px;
        height: 168.75px;
        padding-bottom: 0;
    }
`;

const EpisodeImage = styled(SmartImage)`
    width: 100%;
    padding-bottom: 56.25%;
    flex-shrink: 0;
    @media (min-width: 768px) {
        width: 300px;
        height: 168.75px;
        padding-bottom: 0;
    }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(2)};
`;

const EpisodeRatingContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-right: ${({ theme }) => theme.getSpacing(2)};
`;

const EpisodeTitle = styled.h3`
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.sm};
    margin: ${({ theme }) => theme.getSpacing(0, 0, 1, 0)}
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.md};
    }
`;

const AirDate = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(1, 0, 0, 0)}
    @media(min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    } 
`;

const Overview = styled.p`
    ${({ theme }) => theme.fontStacks.body()}
    font-size: ${({ theme }) => theme.fontSizes.body.xs};
    margin: ${({ theme }) => theme.getSpacing(2)};
    @media (min-width: 550px) {
        font-size: ${({ theme }) => theme.fontSizes.body.sm};
    }
`;

const ToggleExpandedRow = styled.div`
    padding: ${({ theme }) => theme.getSpacing(1, 2)};
    border-top: solid 2px ${({ theme }) => theme.colors.uiPrimary};
`;

const ToggleExpandedButton = styled.button`
    border: none;
    color: ${({ theme }) => theme.colors.black};
    background: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.getSpacing(2)};
    width: 100%;
    ${({ theme }) => theme.fontStacks.bodyBold()}
`;

const ToggleIcon = styled(ChevronDown)`
    color: ${({ theme }) => theme.colors.black};
    width: 14px;
    margin-left: ${({ theme }) => theme.getSpacing(2)};
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

const AdditionalInfoContainer = styled.div`
    display: ${({ isHidden }) => isHidden ? 'none' : 'block'};
    padding: ${({ theme }) => theme.getSpacing(2)};
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
                    {isExpanded ? 'Show less' : 'Show more'}
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
