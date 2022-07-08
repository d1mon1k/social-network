import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import './sassStyles/global.scss'
import './sassStyles/typography.scss'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>
)


