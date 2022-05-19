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
import ProfileContainer from './screens/Profile/ProfileContainer'
import Chat from './screens/Chat/Chat'

const PeopleContainer = React.lazy(() => import('./screens/People/PeopleContainer'))
const PeopleIFollow = React.lazy(() => import('./screens/PeopleIFollow/PeopleIFollow'))
// const Chat = React.lazy(() => import('./screens/Chat/Chat'))
const Settings = React.lazy(() => import('./screens/Settings/Settings'))
const DialogsContainer = React.lazy(() => import('./screens/Messenger/MessengerContainer'))
const Users = React.lazy(() => import('./screens/Users/Users'))
const Login = React.lazy(() => import('./screens/Login/Login'))

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
          <Route path="/dialogs" element={withSuspense(DialogsContainer)}>
            <Route path=":userId" element={withSuspense(DialogsContainer)} />
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

