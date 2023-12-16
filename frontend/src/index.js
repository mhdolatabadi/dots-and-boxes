import React from 'react'
import ReactDOM from 'react-dom'

import ReduxProvider from './setup/store'
import ThemeProvider from './setup/theme'

import './setup/wapp/initialize'
import App from './scenes'

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// import reportWebVitals from './setup/benchmark';
// Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
