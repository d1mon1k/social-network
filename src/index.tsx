import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 68 (Redirect) - добавить в логин компоненте проверку на (isAuth) ->
//todo и рисовать хотя бы profile компоненту

//todo lesson 77 
/* (Validation Forms) - relocate FieldWithValidation component in
 project structure */

 //todo tooltips in login component
 /* improve behavior (adaptive, responsive) with js code */

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
