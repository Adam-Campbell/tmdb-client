import React, { useEffect } from 'react';
import { loginUser } from '../actions';
import { connect } from 'react-redux';
import { NextSeo } from 'next-seo';

function Authenticate(props) {

    useEffect(() => {
        props.loginUser(props.requestToken);
    }, [props.requestToken, props.loginUser]);

    return (
        <>
            <NextSeo title="Authenticate" />
            <div>
                <h1>This is the authentication callback route</h1>
                <button
                    onClick={() => {
                        getSessionId(props.requestToken);
                    }}
                >Click me</button>
            </div>
        </>
    );
}

Authenticate.getInitialProps = async ({ query, req }) => {
    const { request_token, approved } = query;
    return {
        requestToken: request_token,
        success: Boolean(approved)
    };
}


export default connect(undefined, { loginUser })(Authenticate);
