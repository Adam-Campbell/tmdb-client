import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import Head from '../components/head'
import {
  getOnAirTV,
} from '../clientApi';
import { connect } from 'react-redux';
import { Row } from '../components/Layout';
import usePrevious from '../components/usePrevious';
import { useInView } from 'react-intersection-observer';
import { a } from '../axiosClient';

function Home() {

  return (
    <div>
      <Head title="Home" />
      <Row>
        <h1>This is the home page</h1>
      </Row>
    </div>
  );
}



Home.getInitialProps = async ({ req }) => {
  const tvResults = await getOnAirTV();
  //const moviesResults = await a.get('api/movies/popular');
  return {
    tv: tvResults,
  }
}

export default connect(state => state)(Home)
