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

function Recommended({ id, title, posterPath, recommendations }) {

    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/movie/[id]`}
                backAs={`/movie/${id}`}
            />
            <SubNav navData={movieSubNavData} />
            <MediaListView 
                title="Recommended Movies"
                items={recommendations}
                urlSubpath="/movie"
            />
        </div>
    );
}

function mapState(state, ownProps) {
    const m = getMovieData(state);
    return {
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        recommendations: m.recommendations.results
    };
}

const RecommendedPage = withErrorHandling( 
    connect(mapState)(Recommended)
);

RecommendedPage.getInitialProps = getInitialMovieProps;

export default RecommendedPage;
