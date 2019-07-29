import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData } from '../../utils';
import PeopleList from '../../components/PeopleList';
import { Row } from '../../components/Layout';

import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

function CastAndCrew({ id, title, posterPath, cast, crew }) {

    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);

    const orderedCast = useMemo(() => {
        return cast.sort((a,b) => a.order - b.order);
    }, [ cast ]);
    
    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/movie?id=${id}`}
                backAs={`/movie/${id}`}
            />
            <SubNav navData={movieSubNavData} />
            <Row>
                <PeopleList 
                    title="Cast"
                    people={cast}
                />
                <PeopleList 
                    title="Crew"
                    people={crew}
                />
            </Row>
        </div>
    );
}

CastAndCrew.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchMovie(id));
    return {};
}

function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        cast: m.credits.cast,
        crew: m.credits.crew
    };
}

export default connect(mapState)(CastAndCrew);