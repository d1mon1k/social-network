import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 73
//todo разделить логику в нашем data access layer (profile отделить от user использую обратную совместимость)
//todo console.warn
//todo сделать get, put requests; url: ../status
//todo связать input с ref

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
