import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import Head from '../components/head'
import {
  getOnAirTV,
  getNowPlayingMovies
} from '../clientApi';
import { connect } from 'react-redux';
import { Row } from '../components/Layout';
import usePrevious from '../components/usePrevious';
import { useInView } from 'react-intersection-observer';
import { a } from '../axiosClient';
import MediaGridLayout from '../components/MediaGridLayout';
import axios from 'axios';
import toast from '../toast';

async function makeBadRequest() {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/0', {
      params: {
        api_key: '366f08c1f54f6edab9d509f393bf0b54'
      }
    });
    console.log(response);
  } catch (error) {
    console.log('Made it into the catch block');
    console.log(error.message);
  }
}

function Home({ onAirTV, nowPlayingMovies }) {

  return (
    <div>
      <Head title="Home" />
      <button onClick={makeBadRequest}>Click me!</button>
      <button onClick={() => {
        toast.error('404 error encountered');
      }}>Click 4 toast</button>
      <MediaGridLayout 
        gridOneTitle="On Air"
        gridOneData={onAirTV}
        gridTwoTitle="In Theatres"
        gridTwoData={nowPlayingMovies}
      />
    </div>
  );
}



Home.getInitialProps = async ({ req }) => {
  const [
    onAirTV,
    nowPlayingMovies
  ] = await Promise.all([
    getOnAirTV(),
    getNowPlayingMovies()
  ]);
  return {
    onAirTV,
    nowPlayingMovies
  }
}

export default Home;
