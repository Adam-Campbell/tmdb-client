import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';

function Favourites(props) {
    return (
        <>
            <SubNav navData={meRoutesSubNavData} />
            <h1>This is the favourites page</h1>
        </>
    );
}

Favourites.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

export default connect()(Favourites);
