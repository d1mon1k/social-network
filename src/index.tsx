import './sassStyles/global.scss'
import './sassStyles/typography.scss'
import reactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import React from 'react'

//todo скрыть в гитхаб APIkey
//todo Создать dialogs редьюсер с поддержкой тестов
//todo l90 уникализировать константы в редьюсерах
//todo should be validated status (max length)
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
