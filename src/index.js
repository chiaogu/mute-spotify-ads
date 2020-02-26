import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as gtag from 'ga-gtag';

ReactDOM.render(<App />, document.getElementById('root'));
gtag.install('UA-159096556-1');
serviceWorker.unregister();
