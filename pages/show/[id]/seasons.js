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

function Seasons({ id, title, posterPath, seasons }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref="/show/[id]"
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
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
        </div>
    );
}

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        seasons: s.seasons
    };
}

const SeasonsPage = withErrorHandling(
    connect(mapState)(Seasons)
);

SeasonsPage.getInitialProps = getInitialShowProps;

export default SeasonsPage;
