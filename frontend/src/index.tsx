import React from 'react'
import ReactDOM from 'react-dom'

import ReduxProvider from './setting/store'
import ThemeProvider from './setting/theme'

import App from './pages'

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