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
import { NextSeo } from 'next-seo';

function Home({ onAirTV, nowPlayingMovies }) {

  return (
    <div>
      <NextSeo title="Home" />
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
