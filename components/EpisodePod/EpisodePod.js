import React, { useState } from 'react';
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
import { ChevronDown } from 'styled-icons/fa-solid';
import PeopleList from '../PeopleList';

const StyledEpisodePod = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const MainInfoCard = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const EpisodeImage = styled.img`
    width: 100%;
    height: auto;
    @media (min-width: 768px) {
        width: 300px;
        height: 168.84px;
        object-fit: cover;
        object-position: center;
        flex-shrink: 0;
    }
`;

const InfoCol = styled.div`
    
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const EpisodeRatingContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const EpisodeTitle = styled.h3`
    ${text('body', { fontWeight: 700, fontSize: '0.85rem' })}
    margin-top: 0;
    margin-bottom: 5px;
    @media(min-width: 550px) {
        font-size: 1rem;
    }
`;

const AirDate = styled.p`
    ${text('body', { fontWeight: 300, fontSize: '0.75rem' })}
    margin-top: 5px;
    margin-bottom: 0;
    @media(min-width: 550px) {
        font-size: 0.85rem;
    } 
`;

const Overview = styled.p`
    ${text('body', { fontSize: '0.75rem' })}
    margin: 10px;
    @media (min-width: 550px) {
        font-size: 0.85rem;
    }
`;

const ToggleExpandedRow = styled.div`
    padding: 5px 10px;
    border-top: solid #eee 2px;
`;

const ToggleExpandedButton = styled.button`
    border: none;
    color: #222;
    background: none;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    ${text('body', { fontWeight: 400 })}
`;

const ToggleIcon = styled(ChevronDown)`
    color: #222;
    width: 14px;
    margin-left: 10px;
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

const AdditionalInfoContainer = styled.div`
    display: ${({ isHidden }) => isHidden ? 'none' : 'block'};
    padding: 10px;
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

    const [ isExpanded, setExpanded ] = useState(false);

    const stillSrc = getImageUrl(stillPath, imageSizeConstants.w780); 

    function handleToggleClick() {
        setExpanded(prev => !prev);
    }

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
                            {/* <Rating rating={averageRating} /> */}
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
    averageRating: PropTypes.number.isRequired
}