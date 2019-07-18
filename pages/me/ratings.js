import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFullProfile } from '../../actions';
import SubNav from '../../components/SubNav';
import { meRoutesSubNavData } from './';
import UserHeader from '../../components/UserHeader';
import { UserMediaCard } from '../../components/Cards';
import { Row } from '../../components/Layout';

const sampleData = {
    name: 'The Last Kingdom',
    id: 63333,
    vote_average: 7.6,
    first_air_date: '2015-10-10',
    overview: "A show of heroic deeds and epic battles with a thematic depth that embraces politics, religion, warfare, courage, love, loyalty and our universal search for identity. Combining real historical figures and events with fictional characters, it is the story of how a people combined their strength under one of the most iconic kings of history in order to reclaim their land for themselves and build a place they call home.",
    rating: 9,
    posterPath: '/52fBNs8N0xZXHcCm1MDs0nvLQKK.jpg'
};


function Ratings(props) {
    return (
        <>
            {/*<UserHeader />*/}
            <SubNav navData={meRoutesSubNavData} />
            <h1>This is the ratings page</h1>
            <Row>
                <UserMediaCard 
                    id={sampleData.id}
                    title={sampleData.name}
                    releaseDate={sampleData.first_air_date}
                    averageRating={sampleData.vote_average}
                    posterPath={sampleData.posterPath}
                    overview={sampleData.overview}
                    urlSubpath="/show"
                />
            </Row>
        </>
    );
}

Ratings.getInitialProps = async ({ query, store }) => {
    await store.dispatch(fetchFullProfile());
    return {};
}

export default connect()(Ratings);