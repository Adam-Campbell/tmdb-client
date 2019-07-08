import React from 'react';
import styled from 'styled-components';
import { getSearchResults } from '../Api';
import SubNav from '../components/SubNav';
import { getSearchSubNavData } from '../utils';
import { PosterCard, PersonCard } from '../components/Cards';
import { Row } from '../components/Layout';

const MediaCardContainer = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
                <PosterCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    releaseDate={item.release_date}
                    averageRating={item.vote_average}
                    posterPath={item.poster_path}
                    overview={item.overview}
                    urlSubpath="/movie"
                /> 
            ));
        case 'tv':
            return searchResults.map(item => (
                <PosterCard 
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    releaseDate={item.first_air_date}
                    averageRating={item.vote_average}
                    posterPath={item.poster_path}
                    overview={item.overview}
                    urlSubpath="show"
                /> 
            ));
        case 'person':
            return searchResults.map(item => (
                <PersonCard 
                    key={item.id}
                    id={item.id}
                    profilePath={item.profile_path}
                    name={item.name}
                    knownFor={item.known_for.map(production => production.title || production.name).join(',')}
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
            <SubNav navData={navData} />
            <MediaCardContainer>
                {getResultCards(searchResults, searchCategory)}
            </MediaCardContainer>
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