import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import RatingsChart from '../../components/UserCharts/RatingsChart';
import GenresChart from '../../components/UserCharts/GenresChart';
import SubNav from '../../components/SubNav';
import UserHeader from '../../components/UserHeader';
import { getSSRHeaders } from '../../utils';
import withErrorHandling from '../../components/withErrorHandling';
import { NextSeo } from 'next-seo';

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

const Section = styled.section`
    width: calc(100% - 40px);
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ theme }) => theme.getSpacing(4)};
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

export async function getInitialMeProps({ req, query, store }) {
    try {
        await store.dispatch(fetchFullProfile(getSSRHeaders(req)));
        return {};
    } catch (error) {
        return {
            hasError: true,
            errorCode: error.message
        };
    }
}

function Me(props) {
    return (
        <>
            <NextSeo
                title="Me"
                description="Your main profile page."
            />
            <UserHeader />
            <SubNav 
                navData={meRoutesSubNavData} 
                navLabel="Navigation links for pages related to your account"
            />
            <Section>
                <RatingsChart />
                <GenresChart />
            </Section>
        </>
    );
}

const MePage = withErrorHandling(Me);

MePage.getInitialProps = getInitialMeProps;

export default MePage;
