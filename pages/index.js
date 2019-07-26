import React from 'react'
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
import { MediaCard } from '../components/Cards';
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

const Home = () => (
  <div>
    <Head title="Home" />

    <div className="hero">
      <h1 className="title">Welcome to Next!</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
      <button onClick={handleButtonClick}>Click me to add a cookie!</button>

      <div className="row">
        <Link href="https://github.com/zeit/next.js#getting-started">
          <a className="card">
            <h3>Getting Started &rarr;</h3>
            <p>Learn more about Next on Github and in their examples</p>
          </a>
        </Link>
        <Link href="https://open.segment.com/create-next-app">
          <a className="card">
            <h3>Examples &rarr;</h3>
            <p>
              Find other example boilerplates on the{' '}
              <code>create-next-app</code> site
            </p>
          </a>
        </Link>
        <Link href="https://github.com/segmentio/create-next-app">
          <a className="card">
            <h3>Create Next App &rarr;</h3>
            <p>Was this tool helpful? Let us know how we can improve it</p>
          </a>
        </Link>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
        padding-bottom: 800px;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)



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



