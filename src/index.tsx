import React from 'react'
import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import './sassStyles/global.scss'
import './sassStyles/typography.scss'

reactDom.render(
  <Router> {/* for deploy */}
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
)


