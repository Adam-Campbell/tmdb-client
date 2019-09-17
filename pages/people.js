import React from 'react';
import {
    getPopularPeople
} from '../clientApi';
import styled from 'styled-components';
import TitleBlock from '../components/TitleBlock';
import { MinimalCard } from '../components/Cards';
import { Row } from '../components/Layout';
import { NextSeo } from 'next-seo';
import PaginationControls from '../components/PaginationControls';

const Wrapper = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

function People({ results, currentPage }) {
    return (
        <section>
            <NextSeo 
                title="People" 
                description="Browse popular people on React Movie Database, the user editable database for movies and TV shows."
            />
            <TitleBlock title="People" />
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
                <PaginationControls 
                    currentPage={currentPage}
                    pageLinkHref="/people"
                    pageLinkAs="/people"
                />
            </Wrapper>
        </section>
    );
}

People.getInitialProps = async ({ req, query }) => {
    const currentPage = parseInt(query.page) || 1;
    const results = await getPopularPeople(currentPage);
    return {
        results,
        currentPage
    };
};

export default People;