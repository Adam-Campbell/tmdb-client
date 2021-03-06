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
import { MediaSeo } from '../../../components/Seo';

function CastAndCrew({ id, title, posterPath, backdropPath, cast, crew }) {

    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);
    
    return (
        <>
            <MediaSeo isMovie={true} uniqueTitleSegment="Cast and Crew" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref={`/movie/[id]`}
                backAs={`/movie/${id}`}
            />
            <SubNav 
                navData={movieSubNavData} 
                navLabel="Navigation links for pages related to the current movie"
            />
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
        </>
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
