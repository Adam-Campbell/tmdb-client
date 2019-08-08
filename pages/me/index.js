import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import RatingsChart from '../../components/UserCharts/RatingsChart';
import GenresChart from '../../components/UserCharts/GenresChart';
import SubNav from '../../components/SubNav';
import UserHeader from '../../components/UserHeader';

export const meRoutesSubNavData = [
    {
        name: 'Overview',
        href: '/me',
        as: '/me'
    },
    {
        name: 'Lists',
        href: '/me/lists',
        as: '/me/lists'
    },
    {
        name: 'Watchlist',
        href: '/me/watchlist',
        as: '/me/watchlist'
    },
    {
        name: 'Favourites',
        href: '/me/favourites',
        as: '/me/favourites'
    },
    {
        name: 'Ratings',
        href: '/me/ratings',
        as: '/me/ratings'
    }
];

export const mediaTypeFilterData = [
    {
        name: 'Movie',
        value: 'movie',
        id: 'view-filter-movie'
    },
    {
        name: 'TV',
        value: 'tv',
        id: 'view-filter-tv'
    }
];


const Container = styled.div`
    width: calc(100% - 40px);
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    border: solid pink 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;


function Me(props) {
    return (
        <>
            <UserHeader />
            <SubNav navData={meRoutesSubNavData} />
            <Container>
                <RatingsChart />
                <GenresChart />
            </Container>
        </>
    );
}

Me.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

export default connect()(Me);