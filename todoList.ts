/* ------------- Todo ------------- */
//todo Поправить z-index проекта

//todo поддержка тестов ?
//todo почему interface а не type
//todo скрыть в гитхаб APIkey
//todo найти все - bug в проекте

//todo profile-info-block, сделать ссылки кликабельными
//todo should be validated status (max length)
//todo routes '/' and '/profile' fix in app.tsx
//todo типизировать HOC, чтобы возвращали готовую компоненту с типами

//todo implement 404 page
//todo implement last sended message (dialogs component)
//todo implement splash screen

/* ------------- Refactor completed ------------- */
//+ MessengerPage
//+ PeoplePageContainer
//+ ProfilePageContainer

/* ------------- Bugs ------------- */
//bug profile-info-block, ссылки большого размера ломают вёрстку
//bug change profile photo with different size =>> layout breaks

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
