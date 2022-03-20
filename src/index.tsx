import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 68 (Redirect) - добавить в логин компоненте проверку на (isAuth) ->
//todo и рисовать хотя бы profile компоненту

//todo 75 - delete property in state, which contain input data from dialogs text-area,
//todo we should pass this responsibility for react-final-form library

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
