import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getMovieSubNavData } from '../../../utils';
import PeopleList from '../../../components/PeopleList';
import { Row } from '../../../components/Layout';

import { fetchMovie } from '../../../actions';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';

function CastAndCrew({ id, title, posterPath, backdropPath, cast, crew }) {

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
                backdropPath={backdropPath}
                name={title}
                backHref={`/movie/[id]`}
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



function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        backdropPath: m.backdrop_path,
        cast: m.credits.cast,
        crew: m.credits.crew
    };
}

const CastAndCrewPage = withErrorHandling(
    connect(mapState)(CastAndCrew)
);

CastAndCrewPage.getInitialProps = getInitialMovieProps;

export default CastAndCrewPage;
