import React from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import MediaListView from '../../components/MediaListView';

import { fetchShow } from '../../actions';
import { getShowData } from '../../reducers/showReducer';
import { connect } from 'react-redux';

function Similar({ id, title, posterPath, similar }) {
    const showSubNavData = getShowSubNavData(id);
    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/show?id=${id}`}
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

Similar.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchShow(id));
    return {};
}

function mapState(state) {
    const s = getShowData(state)
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        similar: s.similar.results
    };
}

export default connect(mapState)(Similar);