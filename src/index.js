import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import App from './components/App';
import TopStories from './components/TopStories';

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

ReactDOM.render(<TopStories />, document.getElementById('root'));
serviceWorker.unregister();
