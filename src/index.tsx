import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 80

//todo tooltips errors in login component
/* improve behavior (adaptive, responsive) with js code */
//todo BUG - refactor authLogin in auth-ac file. Не хватает знаний typescript
//todo BUG - перейди по следующему пути -> findUsers -> some user -> profile

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
