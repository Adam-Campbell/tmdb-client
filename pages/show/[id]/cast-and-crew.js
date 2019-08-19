import React, { useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getShowSubNavData } from '../../../utils';
import PeopleList from '../../../components/PeopleList';
import { Row } from '../../../components/Layout';
import { fetchShow } from '../../../actions';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';

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
                backHref="/show/[id]"
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

const CastAndCrewPage = withErrorHandling(
    connect(mapState)(CastAndCrew)
);

CastAndCrewPage.getInitialProps = getInitialShowProps;

export default CastAndCrewPage;
