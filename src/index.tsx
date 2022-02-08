import './sassStyles/_global.scss'
import './sassStyles/_typography.scss'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

//todo lesson 66
//todo сделать свой типизированный redux-thunk

reactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
