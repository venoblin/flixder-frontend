import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { OptionsProvider } from './contexts/OptionsContext'
import { UserProvider } from './contexts/UserContext'
import ScrollToTopHandler from './ScrollToTopHandler'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OptionsProvider>
        <UserProvider>
          <ScrollToTopHandler />
          <App />
        </UserProvider>
      </OptionsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
