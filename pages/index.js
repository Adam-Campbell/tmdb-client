import React from 'react'
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


function Home() {
  return (
    <div>
      <Head title="Home" />
      <Row>
        <h1>There is nothing here yet</h1>
      </Row>
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
