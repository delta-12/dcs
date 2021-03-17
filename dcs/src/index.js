import React from 'react'
import ReactDOM from 'react-dom'
import 'bootswatch/dist/darkly/bootstrap.min.css'
import './styles/custom.scss'
import './styles/custom.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,  // fix offset so alert is visible
  offset: "50px",
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} options={options} className="alerts">
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
