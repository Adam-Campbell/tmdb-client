import React from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData } from '../../utils';
import MediaListView from '../../components/MediaListView';
import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

function Similar({ id, title, posterPath, similar }) {
    const movieSubNavData = getMovieSubNavData(id);
    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/movie?id=${id}`}
                backAs={`/movie/${id}`}
            />
            <SubNav navData={movieSubNavData} />
            <MediaListView 
                title="Similar Movies"
                items={similar}
                urlSubpath="/movie"
            />
        </div>
    );
}

Similar.getInitialProps = async ({ query, req, store }) => {
    //const { id } = query;
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
        similar: m.similar.results
    };
}

export default connect(mapState)(Similar);