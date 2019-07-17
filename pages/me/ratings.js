import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

export default connect()(Ratings);