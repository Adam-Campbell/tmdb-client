import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import ReactModal from 'react-modal';
import makeStore from '../store';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { getUserSummary } from '../actions';
import NextHead from 'next/head';
import { text, getSSRHeaders } from '../utils';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultSeo } from 'next-seo';

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
        z-index: 3000;
    }
    .gallery-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
    }
    .centered-modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(17,17,17,0.8);
        z-index: 3000;
    }
    .create-list-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        width: calc(100% - 40px);
        max-width: 600px;
        @media (min-width: 400px) {
            padding: 20px;
        }
    }
    .add-to-list-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        width: calc(100% - 40px);
        max-width: 320px;
        @media (min-width: 400px) {
            max-width: 360px;
            padding: 20px;
        }
    }
    .rating-modal__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
    }
    .rating-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        width: 250px;
        height: 50px;
        position: absolute;
        top: 50px;
        left: 50px;
        border: solid #222 2px;
        outline: none;
        &:focus {
            border-color: #43cbe8;
        }
    }
    .user-menu-modal__content-container {
        background: #fafafa;
        border-radius: 3px;
        position: absolute;
        border: solid #43cbe8 2px;
        outline: none;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .custom-tooltip {
        font-family: sans-serif !important;
        font-weight: 700 !important;
        font-size: 0.85rem !important;
        color: #222 !important;
        background: #fff !important;
    }
    .toast-error {
        background-color: #dc1f3b;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 600;
        color: #fff;
        border-radius: 3px;
    }
    .toast-success {
        background-color: #6ee843;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 600;
        color: #fff;
        border-radius: 3px;
    }
    .toast-info {
        background-color: #43cbe8;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 600;
        color: #fff;
        border-radius: 3px;
    }
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh + 10px);
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        //console.log(ctx.store.getState());
        let pageProps = {};
        // If there is no need to fetch a user summary then this just returns immediately after
        // verifying it isn't needed, becoming more or less a no-op.
        await ctx.store.dispatch(getUserSummary(getSSRHeaders(ctx.req)));
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <>
                    <NextHead>
                        <meta charSet="UTF-8" />
                        <link href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,600|Roboto:700&display=swap" rel="stylesheet" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
                        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
                        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
                        <link rel="icon" href="/static/favicon.ico" /> 
                    </NextHead>
                    <DefaultSeo
                        titleTemplate="%s | React Movie Database"
                        description="React Movie Database is a popular, user editable database for movies and TV shows."
                        additionalMetaTags={[
                            {
                                name: 'keywords',
                                content: 'Movies, TV Shows, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Credits, Cast'
                            }
                        ]}
                    />
                    <GlobalStyle />
                    <Provider store={store}>
                        <PageWrapper>
                            <Header />
                            <main role="main">
                                <Component {...pageProps} />
                            </main>
                            <Footer />
                        </PageWrapper>
                        <ToastContainer position="top-center" />
                    </Provider>
                </>
            </ThemeProvider>
        );
    }
}

export default withRedux(makeStore)(MyApp);