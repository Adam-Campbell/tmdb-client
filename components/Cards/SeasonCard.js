import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { imageSizeConstants, truncateString, formatDateString } from '../../utils';
import {
    StyledSeasonCard,
    PosterImageLink,
    TextColumn,
    TitleRow,
    TitleLink,
    Title,
    SeasonInfo,
    SeasonOverview
} from './seasonCardElements';

export function getOverviewText(overview, airDate, name) {
    const hasNotAired = new Date(airDate) - Date.now() > 0;
    return hasNotAired
        ? `${name} will air on ${formatDateString(airDate)}.`
        : overview.length
            ? truncateString(overview, 280)
            : 'There is no overview for this season';
}

export function SeasonCard({ 
    name, 
    posterPath, 
    airDate, 
    episodeCount, 
    overview,
    showId,
    seasonNumber
}) {
    
    const year = useMemo(() => {
        return airDate.split('-')[0];
    }, [ airDate ]);

    const overviewText = useMemo(() => {
        return getOverviewText(overview, airDate, name);
    }, [ overview, airDate, name ]);

    return (
        <StyledSeasonCard>
            <PosterImageLink 
                imagePath={posterPath}
                imageSize={imageSizeConstants.w185}
                alt={name}
                linkHref="/show/[id]/season/[number]"
                linkAs={`/show/${showId}/season/${seasonNumber}`}
            />
            <TextColumn>
                <TitleRow>
                    <Link
                        href="/show/[id]/season/[number]" 
                        as={`/show/${showId}/season/${seasonNumber}`} 
                        passHref
                    >
                        <TitleLink>
                            <Title>{name}</Title>
                        </TitleLink>
                    </Link>
                    <SeasonInfo>{year} | {episodeCount} episodes</SeasonInfo>
                </TitleRow>
                <SeasonOverview>{overviewText}</SeasonOverview>
            </TextColumn>
        </StyledSeasonCard>
    );
}

SeasonCard.propTypes = {
    name: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    airDate: PropTypes.string.isRequired, 
    episodeCount: PropTypes.number.isRequired,
    overview: PropTypes.string,
    showId: PropTypes.number.isRequired,
    seasonNumber: PropTypes.number.isRequired
};
