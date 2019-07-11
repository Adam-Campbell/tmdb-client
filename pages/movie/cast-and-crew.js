import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData } from '../../utils';
import PeopleList from '../../components/PeopleList';
import { Row } from '../../components/Layout';

import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

const FlexRow = styled(Row)`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

function CastAndCrew({ results }) {
    const movieSubNavData = getMovieSubNavData(results.id);
    return (
        <div>
            <MinimalHeader 
                imagePath={results.poster_path}
                name={results.title}
                backHref={`/movie?id=${results.id}`}
                backAs={`/movie/${results.id}`}
            />
            <SubNav navData={movieSubNavData} />
            <FlexRow>
                <PeopleList 
                    title="Cast"
                    people={results.credits.cast}
                />
                <PeopleList 
                    title="Crew"
                    people={results.credits.crew}
                />
            </FlexRow>
        </div>
    );
}

CastAndCrew.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchMovie(id));
    return {};
}

const mapState = (state) => ({
    results: getMovieData(state)
});

export default connect(mapState)(CastAndCrew);