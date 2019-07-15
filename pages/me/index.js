import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';

function Me(props) {
    return (
        <div>
            <h1>This is the user profile route</h1>
        </div>
    );
}

Me.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

function mapState(state) {
    return;
}

export default connect()(Me);