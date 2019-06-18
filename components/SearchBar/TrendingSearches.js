import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row } from '../Layout';
import Link from 'next/link';

const TrendingContainer = styled.div`
    position: absolute;
    background: white;
    width: 100%;
`;

const TrendingTitle = styled.p`
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: #222;
`;

const TrendingList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    width: 100%;
`;

const TrendingItem = styled.li`
    font-family: sans-serif;
    font-size: 0.85rem;
    color: #222;
    padding: 10px;
    &:nth-child(even) {
        background: #f2f2f2;
    }
`;

const TrendingAnchor = styled.a`
    cursor: pointer;
    display: block;
    &:hover {
        text-decoration: underline;
    }
`;

const TrendingSearches = ({ items }) => (
    <TrendingContainer>
        <Row>
            <TrendingTitle>Trending Searches</TrendingTitle>
        </Row>
        <TrendingList>
            {items.map(item => (
                <TrendingItem key={item.id}>
                    <Row>
                        <Link href="/">
                            <TrendingAnchor>{item.text}</TrendingAnchor>
                        </Link>
                    </Row>
                </TrendingItem>
            ))}
        </TrendingList>
    </TrendingContainer>
);

TrendingSearches.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TrendingSearches;