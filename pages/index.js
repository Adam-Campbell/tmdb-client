import React from 'react'
import {
  getOnAirTV,
  getNowPlayingMovies
} from '../clientApi';
import MediaGridLayout from '../components/MediaGridLayout';
import { NextSeo } from 'next-seo';

function Home({ onAirTV, nowPlayingMovies }) {

  return (
    <section>
      <NextSeo title="Home" />
      <MediaGridLayout 
        gridOneTitle="On Air"
        gridOneData={onAirTV}
        gridTwoTitle="In Theatres"
        gridTwoData={nowPlayingMovies}
      />
    </section>
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
