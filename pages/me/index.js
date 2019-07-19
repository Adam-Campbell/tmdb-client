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
]


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

const Title = styled.h1`
    font-family: sans-serif;
    color: #222;
    font-weight: 700;
    font-size: 2.5rem;
`;

const BarChartContainer = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 350px;
    border: solid green 2px;
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