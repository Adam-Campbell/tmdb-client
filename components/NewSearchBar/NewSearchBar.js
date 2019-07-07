import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';
import { getTrendingSearches } from '../../Api';
import {
    SearchContainer,
    SearchInputRow,
    IconPlaceholder,
    SearchForm,
    SearchInput, 
    TrendingContainer,
    TrendingTitle,
    TrendingList, 
    TrendingItem,
    TrendingAnchor
} from './elements';

/*

Upon mount it calls the trending searches API. 

There are essentially four states the dropdown can be in:

1. Trending searches haven't been fetched yet and there is no search value.
    Don't show anything in the dropdown

2. Trending searches haven't been fetched yet but there is a search value
    Show three items in drop down - current search value for movies, tv and people

3. Trending searches has been fetched and there is no search value:
    Show all items from trending searches

4. Trending searches has been fetched and there is a search value
    Show the three items for the current search value and then also every item from 
    trending searches

When an item is selected from the dropdown (either through enter or through clicking) it needs to trigger
the redirect. I will need to make a handleRedirect function that takes the item and uses the items value
plus entity type to redirect to the search route with the correct query params. 

I think the best way to implement the redirect is to hook into some sort of onChange handler / change
notifier within downshift, and trigger the redirect when it changes. I need to find out the correct thing
to hook into though - it needs to fire when an item is clicked or selected with the enter key, but not
simply when an item is selected with arrows etc. 


I will create a function that takes the current search value and returns either an empty array (if the
search value was an empty string) or returns an array of three objects - one each for movies, tv and people, 
if the search value was not an empty string. 

Then to get the list of items that needs to be rendered, I will combine the results of the above function
with the entities from state.


*/



// id, text, entityType

function searchStringToItems(str) {
    if (str === '') {
        return [];
    } else {
        return [
            { 
                id: 'search-in-movie', 
                value: str,
                entityType: 'movie'
            },
            { 
                id: 'search-in-show', 
                value: str,
                entityType: 'show'
            },
            { 
                id: 'search-in-person', 
                value: str,
                entityType: 'person'
            },
        ]
    }
}

function SearchItem({ item, index, getItemProps, setInputValue, highlightedIndex }) {
    const itemProps = getItemProps({
        item,
        index,
        onClick: () => {
            setInputValue(item.value);
            console.log(`Redirecting to search route with ${item.value}`);
        }
    });
    if (item.id === 'search-in-movie' || item.id === 'search-in-show' || item.id === 'search-in-person') {
        return (
            <li 
                {...itemProps}
                style={{
                    background: highlightedIndex === index ? 'tomato' : 'blue'
                }}
            >
                {item.value}
            </li>
        );
    } else {
        return (
            <li 
                {...itemProps}
                style={{
                    background: highlightedIndex === index ? '#ddd' : '#fff'
                }}
            >
                {item.value}
            </li>
        );
    }
    
}

export function NewSearchBar(props) {
    const [ trendingSearches, setTrendingSearches ] = useState([]);
    const [ inputValue, setInputValue ] = useState('');
    const inputEl = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingData = await getTrendingSearches();
                setTrendingSearches(trendingData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const itemsToRender = [
        ...searchStringToItems(inputValue), 
        ...trendingSearches
    ];

    return (
        <Downshift
            //onChange={(selectedItem) => console.log(selectedItem)}
            selectedItem={null}
            inputValue={inputValue}
            //stateReducer={comboBoxStateReducer}
            itemToString={item => (item ? item.value : '')}
        >
            {({
                getRootProps,
                getInputProps,
                getToggleButtonProps,
                getMenuProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                openMenu,
                setHighlightedIndex
            }) => (
                <div>
                    <div>
                        <input {...getInputProps({ 
                            onFocus: openMenu,
                            onChange: (e) => {
                                setInputValue(e.target.value);
                            },
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    if (itemsToRender[highlightedIndex]) {
                                        const newVal = itemsToRender[highlightedIndex].value;
                                        setInputValue(newVal);
                                        console.log(`Redirecting to search route with ${newVal}`);
                                    } else {
                                        console.log(`input value is: ${inputValue}`);
                                    }
                                }
                            }
                        })}></input>
                    </div>
                    <div>
                        <ul {...getMenuProps()}>
                            {isOpen ? (
                                itemsToRender.map((item, index) => (
                                    <SearchItem 
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        getItemProps={getItemProps}
                                        setInputValue={setInputValue}
                                        highlightedIndex={highlightedIndex}
                                    />
                                ))
                            ) : null}
                        </ul>
                    </div>
                </div>
            )}
        </Downshift>
    );
}