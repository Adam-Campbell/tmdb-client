import React, { useMemo } from 'react';
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

function CastAndCrew({ id, title, posterPath, cast, crew }) {

    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);

    const orderedCast = useMemo(() => {
        return cast.sort((a,b) => a.order - b.order);
    }, [ cast ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/show?id=${id}`}
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
            <Row>
                <PeopleList 
                    title="Cast"
                    people={orderedCast}
                />
                <PeopleList 
                    title="Crew"
                    people={crew}
                />
            </Row>
        </div>
    );
}

CastAndCrew.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
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
