import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';
import { getTrendingSearches } from '../../Api';
import SearchItem from './SearchItem';
import { Search } from 'styled-icons/material';
import { Row } from '../Layout';
import { text } from '../../utils';
import Router from 'next/router';

const SearchBarContainer = styled.div`
    position: sticky;
    left: 0;
    top: 50px;
    width: 100%;
    border-top: solid 1px #eee;
    border-bottom: solid 1px #eee;
    background: #fff;
    z-index: 2000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const InputRow = styled(Row)`
    display: flex;
    align-items: stretch;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const InputIcon = styled(Search)`
    color: #222;
    width: 30px;
    margin-right: 10px;
`;

const Input = styled.input`
    ${text('body')}
    font-style: italic;
    flex-grow: 1;
    text-indent: 20px;
    border: none;
    border: solid 1px;
    border-color: transparent;
    border-radius: 25px;
    &:focus {
        outline: none;
        border-color: #43cbe8;
    }
`;

const Menu = styled.ul`
    position: absolute;
    width: 100%;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    z-index: 2000;
`;

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
