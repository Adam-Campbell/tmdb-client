import React from 'react';
import { getSearchResults } from '../Api';

const Search = (props) => (
    <div>
        <h1>This is the search results page</h1>
    </div>
);

Search.getInitialProps = async ({ query }) => {
    // query is the object provided by NextJS containing all query params, but it is also the name
    // we use for our query param (/search?query=foo) hence the query.query
    const searchQuery = query.query;
    const searchResults = await getSearchResults(searchQuery)
    return { searchResults };
}

export default Search;