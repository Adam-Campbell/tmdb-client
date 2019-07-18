import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import UserHeader from '../../components/UserHeader';

function Ratings(props) {
    return (
        <>
            <UserHeader />
            <SubNav navData={meRoutesSubNavData} />
            <h1>This is the ratings page</h1>
        </>
    );
}

Ratings.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

export default connect()(Ratings);