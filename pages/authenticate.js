import React, { useEffect } from 'react';
import styled from 'styled-components';
import { loginUser } from '../actions';
import { connect } from 'react-redux';
import { NextSeo } from 'next-seo';
import { getHasSessionCreationError } from '../reducers/sessionReducer';
import Router from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '../components/Buttons';
import { a } from '../axiosClient';

const MessageContainer = styled.div`
    width: calc(100vw - 40px);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ theme }) => theme.getSpacing(4)};
    margin-bottom: ${({ theme }) => theme.getSpacing(4)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${({ theme }) => theme.fontStacks.bodyBold()}
    font-size: ${({ theme }) => theme.fontSizes.body.md};
`;

const RetryButton = styled(Button)`
    margin-top: ${({ theme }) => theme.getSpacing(3)};
`;

const LoginLoadingSpinner = styled(LoadingSpinner)`
    margin-bottom: ${({ theme }) => theme.getSpacing(3)};
`;

async function handleRetryClick() {
    try { 
        const response = await a.get('api/token');
        const requestToken = response.data.request_token;
        window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.ROOT_URL}authenticate`;
    } catch (error) {
        console.log(error);
    }
}

function Authenticate({ 
    requestToken,
    didSuccessfullyAuthenticate,
    hasSessionCreationError,
    loginUser  
}) {

    // Despite having dependencies this effect should only ever run as part of the initial render cycle. 
    // The dependencies are derived from the url query string, and as such updating them would cause
    // the page to reload. 
    useEffect(() => {
        // If there is no request token in the query string then the user is on this page by
        // mistake, so just redirect them.
        if (!requestToken) {
            Router.push({ pathname: '/' });
        } else if (didSuccessfullyAuthenticate) {
            loginUser(requestToken);
        }
    }, [ requestToken, didSuccessfullyAuthenticate, loginUser ]);


    if (!requestToken) {
        return null;
    } else if (!didSuccessfullyAuthenticate || hasSessionCreationError) {
        // Render a message informing the user that there was an error logging them in, and provide a
        // button that they can click to try again. 
        return (
            <>
                <NextSeo title="Authenticate" />
                <MessageContainer>
                    Sorry, an error occurred during the login process.
                    <RetryButton onClick={handleRetryClick}>Retry</RetryButton>
                </MessageContainer>
            </>
        );
    } else {
        // If none of the previous conditions were met then we have everything required to log in, and
        // are in the process of doing so. Render a loading spinner with an accompanying message.
        return (
            <>
                <NextSeo title="Authenticate" />
                <MessageContainer>
                    <LoginLoadingSpinner shouldHaveBackground={true} />
                    Logging in and retrieving profile information...
                </MessageContainer>
            </>
        );
    }
}

Authenticate.getInitialProps = async ({ query, req }) => {
    const { request_token, approved } = query;
    return {
        requestToken: request_token,
        didSuccessfullyAuthenticate: Boolean(approved)
    };
}

function mapState(state) {
    return {
        hasSessionCreationError: getHasSessionCreationError(state)
    };
}


export default connect(mapState, { loginUser })(Authenticate);
