import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Row } from '../Layout';
import TrendingSearches from './TrendingSearches';
import { getTrendingSearches } from '../../Api';

const SearchContainer = styled.div`
    background: pink;
    position: relative;
    z-index: 100;
`;

const SearchInputRow = styled(Row)`
    background: green;
    display: flex;
`;

const IconPlaceholder = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    background: #222;
`;

const SearchForm = styled.form`
    width: 100%;
    display: flex;
`;

const SearchInput = styled.input`
    font-family: sans-serif;
    width: 100%;
    border: none;
    text-indent: 10px;
`;


export const SearchBar = () => {
    // track the current search value
    const [ currentSearch, setCurrentSearch ] = useState('');
    // track whether the search bar is currently focused
    const [ isFocused, setIsFocused ] = useState(false);
    // store the trending searches
    const [ trendingSearches, setTrendingSearches ] = useState([]);
    // this effect will run when the component first mounts, and then additionally every time
    // the isFocused state changes, however it will only actually do anything when isFocused is
    // true AND trendingSearches is still an empty array. The result is that if the trending search
    // data is succesfully fetched on component mount then this effect doesn't do anything more for
    // the lifetime of this component. However if the trending data was not successfully fetched, it 
    // will retry every time the search input gains focus. 
    useEffect(() => {
        if (!isFocused || trendingSearches.length) return;

        const fetchData = async () => {
            try {
                const trendingData = await getTrendingSearches();
                setTrendingSearches(trendingData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [isFocused, trendingSearches]);
    
    return (
        <SearchContainer>
            <SearchInputRow>
                <IconPlaceholder />
                <SearchForm onSubmit={(e) => {
                    e.preventDefault();
                    Router.push(`/search?query=${encodeURIComponent(currentSearch)}`);
                    setIsFocused(false);
                }}>
                    <SearchInput 
                        placeholder="Search for a movie, tv show or person..." 
                        value={currentSearch}
                        onChange={e => setCurrentSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </SearchForm>
            </SearchInputRow>
            {Boolean(trendingSearches.length && isFocused) && (
                <TrendingSearches items={trendingSearches}/>
            )}
        </SearchContainer>
    );
};
