import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { parse } from 'cookie';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const makeStore = (initialState, options) => {
    // This logic will grab the token cookie from the request if it exists,
    // and pass that as the initial state for the token reducer so it loads
    // on the client with that info already in place. 
    // if (options.isServer && options.req.headers.cookie) {
    //     //console.log(options);
    //     //console.log(options.req.headers.cookie);
    //     initialState = {
    //         currentUser: {
    //             isLoggedIn: true,
    //             _id: '',
    //             email: '',
    //             follows: [],
    //             hasFetched: false,
    //             signUpDuplicateError: false
    //         }
    //     }
    // }
    //console.log(options);
    if (options.isServer && options.req) {
        //console.log(options.req.headers.cookie);
        //console.log(options.req.cookies);
        //console.log(options.req.cookies);
        console.log(options.req.headers.cookie);
        const { userSessionId } = parse(options.req.headers.cookie || '');
        if (userSessionId) {
            initialState = {
                session: {
                    hasSession: true
                }
            }
        }
        // if (options.req.cookies.userSessionId) {
        //     initialState = {
        //         session: {
        //             hasSession: true
        //         }
        //     }
        // }
    }
    return createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
}

export default makeStore;