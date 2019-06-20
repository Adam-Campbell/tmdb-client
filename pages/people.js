import React from 'react';
import {
    getPopularPeople
} from '../Api';
import styled from 'styled-components';
import ListViewHeader from '../components/ListViewHeader';
import { PersonCard } from '../components/Cards';
import { Row } from '../components/Layout';

const Main = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const People = (props) => (
    <div>
        <ListViewHeader title="People" />
        <Main as="main">
            {props.results.map(person => {
                const knownFor = person.known_for.map(production => production.title || production.name)
                                                 .join(', ');
                return <PersonCard 
                           key={person.id}
                           id={person.id}
                           profilePath={person.profile_path}
                           name={person.name}
                           knownFor={knownFor}
                       />
            })}
        </Main>
    </div>
);

People.getInitialProps = async ({ req }) => {
    const results = await getPopularPeople();
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default People;