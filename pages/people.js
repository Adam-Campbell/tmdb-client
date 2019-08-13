import React from 'react';
import {
    getPopularPeople
} from '../clientApi';
import styled from 'styled-components';
import ListViewHeader from '../components/ListViewHeader';
import { MinimalCard } from '../components/Cards';
import { Row } from '../components/Layout';

const Main = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const People = (props) => (
    <div>
        <ListViewHeader title="People" />
        <Main as="main">
            {props.results.map(person => {
                const knownFor = person.known_for.map(production => production.title || production.name)
                                                 .join(', ');
                return <MinimalCard 
                           key={person.id}
                           id={person.id}
                           imagePath={person.profile_path}
                           name={person.name}
                           additionalDetails={knownFor}
                           urlSubpath="/person"
                           shouldTruncateDetails={true}
                           isPersonImage={true}
                       />
            })}
        </Main>
    </div>
);

People.getInitialProps = async ({ req }) => {
    const results = await getPopularPeople();
    return {
        results,
    };
};

export default People;