import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getMovieSubNavData } from '../../../utils';
import MediaListView from '../../../components/MediaListView';
import { fetchMovie } from '../../../actions';
import { getMovieData } from '../../../reducers/movieReducer';
import { connect } from 'react-redux';
import { getInitialMovieProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import { MediaSeo } from '../../../components/Seo';
 
function Similar({ id, title, posterPath, backdropPath, similar }) {
    
    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);

    return (
        <>
            <MediaSeo isMovie={true} uniqueTitleSegment="Similar Movies" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref={`/movie/[id]`}
                backAs={`/movie/${id}`}
            />
            <SubNav navData={movieSubNavData} />
            <MediaListView 
                title="Similar Movies"
                items={similar}
                urlSubpath="/movie"
            />
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
        similar: m.similar.results
    };
}

const SimilarPage = withErrorHandling(
    connect(mapState)(Similar)
);

SimilarPage.getInitialProps = getInitialMovieProps;

export default SimilarPage;
