import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <GlobalStyle />
                <Header />
                <SearchBar />
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp;