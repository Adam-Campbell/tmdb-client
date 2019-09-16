import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import makeStore from '../store';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { getUserSummary } from '../actions';
import NextHead from 'next/head';
import { getSSRHeaders } from '../utils';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultSeo } from 'next-seo';
import GlobalStyles from '../globalStyles';

ReactModal.setAppElement('#__next');

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh + 10px);
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
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
                    <GlobalStyles />
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
