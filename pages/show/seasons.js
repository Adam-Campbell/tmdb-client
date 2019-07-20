import React from 'react';
import styled from 'styled-components';
import { fetchShow } from '../../actions';
import { getShowData } from '../../reducers/showReducer';
import { connect } from 'react-redux';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import { Row } from '../../components/Layout';
import { SeasonCard } from '../../components/Cards';

function Seasons({ id, title, posterPath, seasons }) {

    const showSubNavData = getShowSubNavData(id);

    const s1 = seasons[1];
    const s2 = seasons[2];

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/show?id=${id}`}
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
            <Row>
                <h1>This is the seasons route!</h1>
                <SeasonCard 
                    name={s1.name}
                    posterPath={s1.poster_path}
                    airDate={s1.air_date}
                    episodeCount={s1.episode_count}
                    overview={s1.overview}
                    showId={id}
                    seasonNumber={s1.season_number}
                />
                <SeasonCard 
                    name={s2.name}
                    posterPath={s2.poster_path}
                    airDate={s2.air_date}
                    episodeCount={s2.episode_count}
                    overview={s2.overview}
                    showId={id}
                    seasonNumber={s2.season_number}
                />
            </Row>
        </div>
    );
}

Seasons.getInitialProps = async ({ query, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchShow(id));
    return {};
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

export default connect(mapState)(Seasons);