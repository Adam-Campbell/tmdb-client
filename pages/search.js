import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getSearchResults } from '../clientApi';
import { MediaCard, MinimalCard } from '../components/Cards';
import { Row } from '../components/Layout';
import SearchNavigation from '../components/SearchNavigation';
import { NextSeo } from 'next-seo';

const CardsContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

function getResultCards(searchResults, searchCategory) {
    if (searchResults.length === 0) {
        return (
            <p>Sorry, we couldn't find any results for that search :(</p>
        );
    }
    switch (searchCategory) {
        case 'movie':
            return searchResults.map(item => (
                <MediaCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    releaseDate={item.release_date}
                    averageRating={item.vote_average}
                    posterPath={item.poster_path}
                    backdropPath={item.backdrop_path}
                    overview={item.overview}
                    urlSubpath="/movie"
                /> 
            ));
        case 'tv':
            return searchResults.map(item => (
                <MediaCard 
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    releaseDate={item.first_air_date}
                    averageRating={item.vote_average}
                    posterPath={item.poster_path}
                    backdropPath={item.backdrop_path}
                    overview={item.overview}
                    urlSubpath="/show"
                /> 
            ));
        case 'person':
            return searchResults.map(item => (
                <MinimalCard 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imagePath={item.profile_path}
                    urlSubpath="/person"
                    additionalDetails={item.known_for.map(el => el.title || el.name).join(',')}
                    shouldTruncateDetails={true}
                    isPersonImage={true}
                /> 
            ));
        default:
            return null;
    }
}


function Search({ searchQuery, searchCategory, searchResults }) {
    return (
        <section>
            <NextSeo title="Search" />
            <SearchNavigation 
                searchQuery={searchQuery}
            />
            <CardsContainer>
                {getResultCards(searchResults, searchCategory)}
            </CardsContainer>
        </section>
    );
}

Search.getInitialProps = async ({ query, req }) => {
    // query is the object provided by NextJS containing all query params, but it is also the name
    // we use for our query param (/search?query=foo) hence the query.query
    const searchQuery = query.query;
    const searchCategory = query.category;
    const searchResults = await getSearchResults(searchQuery, searchCategory);
    return { 
        searchResults,
        searchQuery,
        searchCategory
    };
}

export default Search;
