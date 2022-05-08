import './sassStyles/global.scss'
import './sassStyles/typography.scss'
import reactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import React from 'react'

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

/* ------------- Todo ------------- */
//todo изменить svg в peopleIfollow - crossBtn
//todo реализовать сортировку пользователей 
//todo implement React.suspense, react.lazy
//todo скрыть в гитхаб APIkey
//todo Создать dialogs редьюсер с поддержкой тестов
//todo l90 уникализировать константы в редьюсерах
//todo should be validated status (max length)
//todo refactor redux folder as azwrd
//todo почему interface а не type
//todo поработать над myPosts

/* ------------- Bugs ------------- */
/** //bug
 * Как гость нажми на странице Users => follow , unfollow; 
 * Надо убрать эту возможность для не авторизованных пользователей
 */

/** //bug 
 * tooltips errors in login component
 * improve behavior (adaptive, responsive) with js code
 */

/** //bug
 * findUsers => peopleIFollow -> быстро
 */



