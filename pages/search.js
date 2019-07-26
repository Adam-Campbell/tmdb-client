import React from 'react';
import styled from 'styled-components';
import { getSearchResults } from '../Api';
import SubNav from '../components/SubNav';
import { getSearchSubNavData } from '../utils';
import { PosterCard, PersonCard, MediaCard, MinimalCard } from '../components/Cards';
import { Row } from '../components/Layout';

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
                /> 
            ));
        default:
            return null;
    }
}


const Search = ({ searchQuery, searchCategory, searchResults }) => {
    const navData = getSearchSubNavData(searchQuery);
    return (
        <div>
            <SubNav navData={navData} alignCenter={true} />
            <CardsContainer>
                {getResultCards(searchResults, searchCategory)}
            </CardsContainer>
        </div>
    );
};

Search.getInitialProps = async ({ query, req }) => {
    // query is the object provided by NextJS containing all query params, but it is also the name
    // we use for our query param (/search?query=foo) hence the query.query
    const searchQuery = query.query;
    const searchCategory = query.category;
    console.log(searchQuery, searchCategory);
    const searchResults = await getSearchResults(searchQuery, searchCategory);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return { 
        searchResults,
        searchQuery,
        searchCategory,
        ...serverInfo 
    };
}

export default Search;