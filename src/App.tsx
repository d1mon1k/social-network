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
const PeopleContainer = React.lazy(() => import('./pages/PeoplePage/PeoplePageContainer'))
const MessengerContainer = React.lazy(() => import('./pages/MessengerPage/MessengerContainer'))
const UsersList = React.lazy(() => import('./components/UsersList/UsersList'))
const Login = React.lazy(() => import('./pages/Login/Login'))

/* ------------- Component ------------- */
const App: React.FC<AppContainerProps> = ({ initializeAppThunk, isInitialized }) => {
  useEffect(() => {
    initializeAppThunk()
  }, [initializeAppThunk])

  return !isInitialized ? (
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
            <Route index element={withSuspense(UsersList)}/>
            <Route path="friends" element={withSuspense(UsersList)}/>
          </Route>
          <Route path="*" element={<div>404 not found</div>}/>
        </Routes>
      </div>
    </div>
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (store: RootState) => {
  return {
    isInitialized: store.app.isInitialized
  } 
}

const mapDispatchToProps = {
  initializeAppThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type AppContainerProps = ConnectedProps<typeof connector>
export default compose<any>(connector)(App)

