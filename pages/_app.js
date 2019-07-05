import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#__next');

const GlobalStyle = createGlobalStyle`
    ${normalize}
    
    * {
    box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .gallery-modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(17,17,17,0.8);
        z-index: 2000;
    }
    .gallery-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
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