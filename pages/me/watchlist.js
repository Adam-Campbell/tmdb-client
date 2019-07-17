import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

export default connect()(Watchlist);