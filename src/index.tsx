import React from 'react'
import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import './sassStyles/global.scss'
import './sassStyles/typography.scss'

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
//todo поддержка тестов ?
//todo почему interface а не type
//todo скрыть в гитхаб APIkey
//todo найти все - bug в проекте

//todo profile-info-block, сделать ссылки кликабельными
//todo should be validated status (max length)
//todo routes '/' and '/profile' fix in app.tsx
//todo типизировать HOC, чтобы возвращали готовую компоненту с типами
//todo Profile => InfoBlock => form - delete default value in InfoRow

//todo implement 404 page
//todo implement last sended message (dialogs component)
//todo implement splash screen

/* ------------- Refactor completed ------------- */
//+ MessengerPage
//+ PeoplePageContainer

/* ------------- Bugs ------------- */
//bug profile-info-block, ссылки большого размера ломают вёрстку
//bug change profile photo with different size =>> layout breaks

/** //bug
 * peopleIFollow --> scroll down, to get more users --> FindDevelopers ; много раз и наоборот , смотри нетворк
 */

/** //bug User without authorization
 * - Как гость нажми на странице Users => follow , unfollow; 
 * - Logout из компоненты profile === фотография и данные пользователя остаются в userInterface
 * - People I follow screen === доступен без авторизации
 * - Dialogs => refresh page === не понятно авторизован пользователь или нет
 * - random user => status:hover - убрать, ability to change profile photo.
 * Надо убрать эту возможность для не авторизованных пользователей
 */

/** //bug 
 * tooltips errors in login component
 * improve behavior (adaptive, responsive) with js code
 */

