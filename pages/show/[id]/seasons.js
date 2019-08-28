import React, { useMemo } from 'react';
import styled from 'styled-components';
import { fetchShow } from '../../../actions';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getShowSubNavData } from '../../../utils';
import { Row } from '../../../components/Layout';
import { SeasonCard } from '../../../components/Cards';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import { MediaSeo } from '../../../components/Seo';

function Seasons({ id, title, posterPath, backdropPath, seasons }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);

    return (
        <>
            <MediaSeo uniqueTitleSegment="Seasons" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref="/show/[id]"
                backAs={`/show/${id}`}
            />
            <SubNav 
                navData={showSubNavData} 
                navLabel="Navigation links for pages related to the current TV show"
            />
            <Row>
                {seasons.map((season) => (
                    <SeasonCard 
                        key={season.id}
                        name={season.name || `Season ${season.season_number}`}
                        posterPath={season.poster_path || ''}
                        airDate={season.air_date}
                        episodeCount={season.episode_count}
                        overview={season.overview || ''}
                        showId={id}
                        seasonNumber={season.season_number}
                    />
                ))}
            </Row>
        </>
    );
}

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        backdropPath: s.backdrop_path,
        seasons: s.seasons
    };
}

const SeasonsPage = withErrorHandling(
    connect(mapState)(Seasons)
);

SeasonsPage.getInitialProps = getInitialShowProps;

export default SeasonsPage;
