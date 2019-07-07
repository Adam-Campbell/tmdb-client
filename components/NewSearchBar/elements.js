import styled from 'styled-components';
import { Row } from '../Layout';

export const SearchContainer = styled.div`
    background: pink;
    position: relative;
    z-index: 100;
`;

export const SearchInputRow = styled(Row)`
    background: green;
    display: flex;
`;

export const IconPlaceholder = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    background: #222;
`;

export const SearchForm = styled.form`
    width: 100%;
    display: flex;
`;

export const SearchInput = styled.input`
    font-family: sans-serif;
    width: 100%;
    border: none;
    text-indent: 10px;
`;

export const TrendingContainer = styled.div`
    position: absolute;
    background: white;
    width: 100%;
`;

export const TrendingTitle = styled.p`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: #222;
`;

export const TrendingList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    width: 100%;
`;

export const TrendingItem = styled.li`
    font-family: sans-serif;
    font-size: 0.85rem;
    color: #222;
    padding: 10px;
    &:nth-child(even) {
        background: #f2f2f2;
    }
`;

export const TrendingAnchor = styled.a`
    cursor: pointer;
    display: block;
    &:hover {
        text-decoration: underline;
    }
`;
