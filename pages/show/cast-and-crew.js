import React from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import PeopleList from '../../components/PeopleList';
import { Row } from '../../components/Layout';

const FlexRow = styled(Row)`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

function CastAndCrew({ results }) {
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

CastAndCrew.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
}

export default CastAndCrew;
