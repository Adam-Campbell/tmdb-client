import React, { useState } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import Head from '../components/head'
import {
  getNowPlayingMovies,
  getOnAirTV,
  getRequestToken
} from '../Api';
import axios from 'axios';
import { connect } from 'react-redux';
import API_KEY from '../apiKey';
import { Row } from '../components/Layout';
import ListBox from '../components/ListBox';
import RangeSelect from '../components/RangeSelect';

async function handleButtonClick() {
  const requestToken = await getRequestToken();
  window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticate`
}

const mockData = {
  id: 458156,
  title: "John Wick: Chapter 3 – Parabellum",
  releaseDate: "2019-05-15",
  averageRating: 7.1,
  posterPath: "/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",
  backdropPath: "/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg",
  overview: "Super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin’s guild, the High Table, John Wick is excommunicado, but the world’s most ruthless hit men and women await his every turn.",
  urlSubpath: '/movie'
}

const PaddedRow = styled(Row)`
  padding-top: 40px;
  padding-bottom: 200px;
`;

const RangeSelectContainer = styled.div`
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`;

const selectData = [
  { value: 'option_one', name: 'Option 1' },
  { value: 'option_two', name: 'Option 2' },
  { value: 'option_three', name: 'Option 3' },
  { value: 'option_four', name: 'Option 4' },
  { value: 'option_five', name: 'Option 5' }
];

function Home() {

  const [ currentValue, setValue ] = useState({});

  const [ currentScoreRange, setScoreRange ] = useState([0, 10])

  return (
    <div>
      <Head title="Home" />
      <PaddedRow>
        <p>The current value is {currentValue.name}</p>
        <ListBox 
          items={selectData}
          currentValue={currentValue}
          setValue={setValue}
          labelText="Sort by:"
          shouldInlineLabel={true}
          onChange={() => console.log('change is inevitable')}
          placeholder="Select a list"
        />
        <RangeSelectContainer>
          <RangeSelect 
            domain={[0, 10]}
            stepSize={0.1}
            initialValues={[0, 10]}
            numTicks={10}
            contentDescription="Show me movies that scored"
            isControlled={true}
            externalValue={currentScoreRange}
            setExternalValue={setScoreRange}
          />
        </RangeSelectContainer>
      </PaddedRow>
    </div>
  );
}



Home.getInitialProps = async ({ req }) => {
  const tvResults = await getOnAirTV();
  const moviesResults = await getNowPlayingMovies();
  const serverInfo = req ? { isDevice: req.isDevice } : {};
  return {
    tv: tvResults,
    movies: moviesResults,
    ...serverInfo
  }
  //const results = await axios.get('http://localhost:3000/api/home');
  //return { ...results.data };
}

export default connect(state => state)(Home)
