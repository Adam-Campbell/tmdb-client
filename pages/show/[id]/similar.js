import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getShowSubNavData } from '../../../utils';
import MediaListView from '../../../components/MediaListView';

import { fetchShow } from '../../../actions';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import MediaSeo from '../../../components/MediaSeo';

function Similar({ id, title, posterPath, backdropPath, similar }) {
    
    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MediaSeo />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref={`/show/[id]`}
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
            <MediaListView 
                title="Similar Shows"
                items={similar}
                urlSubpath="/show"
            />
        </div>
    );
}

function mapState(state) {
    const s = getShowData(state)
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        backdropPath: s.backdrop_path,
        similar: s.similar.results
    };
}


const SimilarPage = withErrorHandling(
    connect(mapState)(Similar)
);

SimilarPage.getInitialProps = getInitialShowProps;

export default SimilarPage;
