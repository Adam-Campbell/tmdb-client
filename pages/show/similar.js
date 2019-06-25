import React from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import MediaListView from '../../components/MediaListView';

function Similar({ results }) {
    const showSubNavData = getShowSubNavData(results.id);
    return (
        <div>
            <MinimalHeader 
                imagePath={results.poster_path}
                name={results.name}
                backHref={`/show?id=${results.id}`}
                backAs={`/show/${results.id}`}
            />
            <SubNav navData={showSubNavData} />
            <MediaListView 
                title="Similar Shows"
                items={results.similar.results}
                urlSubpath="/show"
            />
        </div>
    );
}

Similar.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
}

export default Similar;