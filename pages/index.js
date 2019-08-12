import React, { useState, useEffect, useRef } from 'react'
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
import usePrevious from '../components/usePrevious';
import { useInView } from 'react-intersection-observer';
import { a } from '../axiosClient';


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
  padding-top: 800px;
  padding-bottom: 800px;
`;

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   }, [ value ]);
//   return ref.current;
// }

function Trigger() {
  const [ ref, inView, entry ] = useInView({ triggerOnce: true });
  console.log(`Is in view? ${inView}`);
  return <div ref={ref}></div>;
}

function Counter() {
  const [ count, setCount ] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <div>
      <p>The current count is {count} and the previous count is {prevCount}</p>
      <button
        onClick={() => setCount(prev => prev + 1)}
      >Increment</button>
    </div>
  );
}

async function hitCookieEndpoint() {
  //const cookieResponse = await fetch('http://localhost:3000/api/cookie', { credentials: 'include' });
  const cookieResponse = await a.get('/api/cookie');
  console.log('response is: ', cookieResponse.data);
}


function Home() {

  return (
    <div>
      <Head title="Home" />
      <PaddedRow>
        <button onClick={hitCookieEndpoint}>Hit cookie endpoint</button>
        <Trigger />
        <Trigger />
        <Trigger />
      </PaddedRow>
    </div>
  );
}



Home.getInitialProps = async ({ req }) => {
  const tvResults = await getOnAirTV();
  //const moviesResults = await getNowPlayingMovies();
  //const moviesResults = await a.get('api/movies/popular', { params: { page: 1 } });
  const moviesResults = await a.get('api/movies/popular');
  //const serverInfo = req ? { isDevice: req.isDevice } : {};
  //const cookieResponse = await a.get('/api/cookie');
  //const cookieResponse = await fetch('http://localhost:3000/api/cookie', { credentials: 'include' });
  //const parsedCookie = await cookieResponse.json();
  return {
    tv: tvResults,
    //cookie: parsedCookie
    //movies: moviesResults,
    //movies: moviesResults.data,
    //...serverInfo
  }
  //const results = await axios.get('http://localhost:3000/api/home');
  //return { ...results.data };
}

export default connect(state => state)(Home)
