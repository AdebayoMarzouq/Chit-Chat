import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import { UserProvider } from './context'
import { store } from './redux/store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <StoreProvider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </StoreProvider>
    </Router>
  </React.StrictMode>
)
