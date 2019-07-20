import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getSeasonDetails } from '../../Api';

export default function Season(props) {
    return (
        <div>
            <h1>This is the season route!</h1>
        </div>
    );
}

Season.getInitialProps = async ({ query }) => {
    const { id, number } = query;
    const seasonDetails = await getSeasonDetails(id, number);
    console.log(seasonDetails)
    return {
        seasonDetails
    };
}