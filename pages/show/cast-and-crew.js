import React from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData } from '../../utils';
import PeopleList from '../../components/PeopleList';
import { Row } from '../../components/Layout';

import { fetchShow } from '../../actions';
import { getShowData } from '../../reducers/showReducer';
import { connect } from 'react-redux';

const FlexRow = styled(Row)`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

function CastAndCrew({ id, title, posterPath, cast, crew }) {
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
            <FlexRow>
                <PeopleList 
                    title="Cast"
                    people={cast}
                />
                <PeopleList 
                    title="Crew"
                    people={crew}
                />
            </FlexRow>
        </div>
    );
}

CastAndCrew.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchShow(id));
    return {};
}

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        cast: s.credits.cast,
        crew: s.credits.crew
    };
}

export default connect(mapState)(CastAndCrew);
