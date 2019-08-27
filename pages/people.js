import React from 'react';
import {
    getPopularPeople
} from '../clientApi';
import styled from 'styled-components';
import ListViewHeader from '../components/ListViewHeader';
import { MinimalCard } from '../components/Cards';
import { Row } from '../components/Layout';
import { NextSeo } from 'next-seo';

const Wrapper = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

function People({ results }) {
    return (
        <section>
            <NextSeo 
                title="People" 
                description="Browse popular people on React Movie Database, the user editable database for movies and TV shows."
            />
            <ListViewHeader title="People" />
            <Wrapper as="main">
                {results.map(person => {
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
            </Wrapper>
        </section>
    );
}

People.getInitialProps = async ({ req }) => {
    const results = await getPopularPeople();
    return {
        results
    };
};

export default People;