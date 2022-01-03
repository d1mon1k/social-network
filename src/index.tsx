import './index.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'

//todo lesson 59
//todo сделать переход на чей-нибудь профайл.
//todo refactor redux directory like in movie app by Alex

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
