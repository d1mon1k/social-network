import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 60
//todo axios in ProfileContainer

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
