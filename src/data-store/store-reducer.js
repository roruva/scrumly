import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';

// import promiseMiddleware from 'redux-promise-middleware';
// import isomorphicFetch from 'isomorphic-fetch';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import user from '../containers/users/reducer';
import team from '../containers/teams/reducer';
import dashboard from '../containers/dashboard/reducer';
import navbar from '../components/navbar/reducer';

// const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
//     next( typeof action === 'function'
//         ? action({ ...deps, dispatch, getState})
//         : action
//     );

const rootReducer = combineReducers({
    user,
    team,
    dashboard,
    navbar,
    form: formReducer
});

const middleware = [
    logger,
    // injectMiddleware({
    //     fetch: isomorphicFetch
    // }),
    promiseMiddleware({ promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'] })
    // reduxImmutableStateInvariant
];

const storeReducer = createStore(rootReducer, applyMiddleware(...middleware));
// const storeReducer = createStore(rootReducer);

export default storeReducer;