import cl from './App.module.scss'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './redux/store'
import { compose } from 'redux'
import { initializeAppThunk } from './redux/app/thunks'
import { withSuspense } from './helpers/helpers'
import NavBar from './components/NavBar/NavBar'
import HeaderContainer from './components/Header/HeaderContainer'
import Preloader from './components/common/Preloader/Preloader'
import ProfileContainer from './pages/Profile/ProfileContainer'

const Chat = React.lazy(() => import('./pages/Chat/Chat'))
const MessagesList = React.lazy(() => import('./components/MessagesBlock/MessagesList/MessagesList')) 
const PeopleContainer = React.lazy(() => import('./pages/People/PeopleContainer'))
const PeopleIFollow = React.lazy(() => import('./pages/PeopleIFollow/PeopleIFollow'))
const Settings = React.lazy(() => import('./pages/Settings/Settings'))
const MessengerContainer = React.lazy(() => import('./pages/MessengerPage/MessengerContainer'))
const Users = React.lazy(() => import('./pages/Users/Users'))
const Login = React.lazy(() => import('./pages/Login/Login'))

const App: React.FC<PropsFromRedux> = (props) => {
  useEffect(() => {
    props.initializeAppThunk()
  })

  return !props.isInitialized ? (
    <Preloader width="120px" height="120px" position="fixed" />
  ) : (
    <div className={cl.appWrapper}>
      <HeaderContainer />
      <NavBar />
      <div className={cl.mainContent}>
        <Routes>
          <Route path="/" element={<ProfileContainer />} />
          <Route path="/profile">
            <Route index element={<ProfileContainer />} />
            <Route path=":userId" element={<ProfileContainer />} />
          </Route>
          <Route path="/login" element={withSuspense(Login)} />

          <Route path="/messenger" element={withSuspense(MessengerContainer)}>
            <Route path=":userId" element={withSuspense(MessagesList)} />
            <Route path="chat" element={withSuspense(Chat)} />
          </Route>

          <Route path="/people" element={withSuspense(PeopleContainer)}>
            <Route index element={withSuspense(Users)}/>
            <Route path="developersIFollow" element={withSuspense(PeopleIFollow)}/>
          </Route>
          <Route path="/chat" element={<Chat/>} />
          <Route path="/settings" element={withSuspense(Settings)} />
          <Route path="*" element={<div>404 not found</div>}/>
        </Routes>
      </div>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    isInitialized: store.app.isInitialized
  } 
}

const actionCreators = {
  initializeAppThunk
}

const connector = connect(mapStateToProps, actionCreators)
type PropsFromRedux = ConnectedProps<typeof connector>
export default compose<any>(connector)(App)

