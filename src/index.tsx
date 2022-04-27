import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import React from 'react'

//todo lesson 82
//todo refactor redux folder as azwrd
//============================== BUGS ==============================
//BUG tooltips errors in login component
/* improve behavior (adaptive, responsive) with js code */

//BUG - refactor authLogin in auth-ac file. Не хватает знаний typescript
//BUG - перейди по следующему пути -> findUsers -> some user -> profile

reactDom.render(
  <HashRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)
