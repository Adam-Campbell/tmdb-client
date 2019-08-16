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

function Recommended({ id, title, posterPath, recommendations }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref="/show/[id]"
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
            <MediaListView 
                title="Recommended Shows"
                items={recommendations}
                urlSubpath="/show"
            />
        </div>
    );
}

Recommended.getInitialProps = getInitialShowProps;

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        recommendations: s.recommendations.results
    };
}

export default connect(mapState)(Recommended);