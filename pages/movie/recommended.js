import React from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData } from '../../utils';
import MediaListView from '../../components/MediaListView';

import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

function Recommended({ results }) {
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
            <MediaListView 
                title="Recommended Movies"
                items={results.recommendations.results}
                urlSubpath="/movie"
            />
        </div>
    );
}

Recommended.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchMovie(id));
    return {};
}

const mapState = (state) => ({
    results: getMovieData(state)
});

export default connect(mapState)(Recommended);