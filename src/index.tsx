import React from 'react'
import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import './sassStyles/global.scss'
import './sassStyles/typography.scss'

reactDom.render(
  <HashRouter> {/* for deploy */}
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)


