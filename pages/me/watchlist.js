import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';

function Watchlist(props) {
    return (
        <>
            <SubNav navData={meRoutesSubNavData} />
            <h1>This is the watchlist page!</h1>
        </>
    );
}

Watchlist.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

export default connect()(Watchlist);