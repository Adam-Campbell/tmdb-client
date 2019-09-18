import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import SearchItem from './SearchItem';
import Router from 'next/router';
import { a } from '../../axiosClient';
import {
    SearchBarContainer,
    InputRow,
    InputIcon,
    Input, 
    Menu
} from './searchBarElements';

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
                id: 'search-in-tv', 
                value: str,
                entityType: 'tv'
            },
            { 
                id: 'search-in-person', 
                value: str,
                entityType: 'person'
            },
        ]
    }
}

function handleRedirect(item) {
    Router.push({
        pathname: '/search',
        query: {
            category: item.entityType,
            query: item.value 
        }
    });
}

export function SearchBar(props) {

    const [ trendingSearches, setTrendingSearches ] = useState([]);

    const [ inputValue, setInputValue ] = useState('');

    const inputEl = useRef(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingDataResponse = await a.get('api/trending');
                setTrendingSearches(trendingDataResponse.data);
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
            onChange={handleRedirect}
            selectedItem={null}
            inputValue={inputValue}
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
                closeMenu,
                setHighlightedIndex
            }) => (
                <SearchBarContainer {...getRootProps()}>
                    <InputRow>
                        <InputIcon />
                        <Input {...getInputProps({
                            placeholder: "Search for a movie, TV show or person...", 
                            onFocus: openMenu,
                            onChange: (e) => {
                                setInputValue(e.target.value);
                            },
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    if (itemsToRender[highlightedIndex]) {
                                        const newVal = itemsToRender[highlightedIndex].value;
                                        setInputValue(newVal);
                                    } else {
                                        handleRedirect({
                                            value: inputValue,
                                            entityType: 'movie'
                                        });
                                        closeMenu();
                                    }
                                }
                            }
                        })}></Input>
                    </InputRow>
                    <Menu {...getMenuProps()}>
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
                    </Menu>
                </SearchBarContainer>
            )}
        </Downshift>
    );
}
