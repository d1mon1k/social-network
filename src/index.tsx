import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 69
//todo Создать отдельный файл с withAuthRedirect HOC 
//todo Внутри создать логику и отрисовать либо компоненту основную либо login ->
//todo и обернуть это RedirectComponent

//todo lesson 68 (Redirect) - добавить в логин компоненте проверку на (isAuth) ->
//todo и рисовать хотя бы profile компоненту

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
