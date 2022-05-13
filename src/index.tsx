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
//todo implement splash screen
//todo implement chat
//todo implement React.suspense, react.lazy
//todo скрыть в гитхаб APIkey
//todo Создать dialogs редьюсер с поддержкой тестов
//todo l90 уникализировать константы в редьюсерах
//todo should be validated status (max length)
//todo почему interface а не type
//todo поработать над myPosts
//todo найти все - bug в проекте
//todo типизировать HOC, чтобы возвращали готовую компоненту с типами

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

/** //bug
 * Dialogs => refresh page === не понятно авторизован пользователь или нет
 */

/** //bug
 * Logout из компоненты profile === фотография и данные пользователя остаются в userInterface
 */

/** //bug
 * People I follow screen === доступен без авторизации
 */

/** //bug
 * peopleIFollow --> scroll down, to get more users --> FindDevelopers ; много раз и наоборот , смотри нетворк
 */



