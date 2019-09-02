import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { parse } from 'cookie';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const makeStore = (initialState, options) => {
    if (options.isServer && options.req) {
        console.log(options.req.headers.cookie);
        const { userSessionId } = parse(options.req.headers.cookie || '');
        if (userSessionId) {
            initialState = {
                session: {
                    hasSession: true
                }
            }
        }
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
