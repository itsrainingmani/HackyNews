import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
