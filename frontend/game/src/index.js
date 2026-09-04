import React from 'react'
import { createRoot } from 'react-dom/client'

import ReduxProvider from './setup/store'
import ThemeProvider from './setup/theme'

import './setup/wapp/initialize'
import App from './scenes'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
)

// import reportWebVitals from './setup/benchmark';
// Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
