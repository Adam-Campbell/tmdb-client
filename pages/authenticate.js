import React, { useEffect } from 'react';
import axios from 'axios';
//import { getSessionId } from '../Api';
import { loginUser } from '../actions';
import { connect } from 'react-redux';


function Authenticate(props) {

    useEffect(() => {
        props.loginUser(props.requestToken);
    }, [props.requestToken, props.loginUser]);

    return (
        <div>
            <h1>This is the authentication callback route</h1>
            <button
                onClick={() => {
                    getSessionId(props.requestToken);
                }}
            >Click me</button>
        </div>
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
