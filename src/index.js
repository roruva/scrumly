import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import Bluebird from 'bluebird';

// import './index.css';
// import './styles/index.css';
import App from './App';
import storeReducer from './data-store/store-reducer';
import registerServiceWorker from './registerServiceWorker';

window.Promise = Bluebird;
Bluebird.config({ warning: false });

window.addEventListener('unhandlerejection', err => {
    err.preventDefault();
    // if (proccess.env.NODE_ENV !== "production") {
        console.warn('Unhandle promise rejection warning', err.detail);
    // }
})

ReactDOM.render(
        <Provider store={storeReducer}>
            <App />
        </Provider>
    , document.getElementById('root'));
registerServiceWorker();
