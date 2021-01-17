import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './styles/custom.scss'
import './styles/custom.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
