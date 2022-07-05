import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { compose } from 'redux'
import cl from './App.module.scss'
import ChatListPopUpContainer from './components/ChatWindow/ChatWindowContainer'
import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import NavBar from './components/NavBar/NavBar'
import { withSuspense } from './helpers/helpers'
import ProfileContainer from './pages/ProfilePage/ProfilePageContainer'
import { initializeAppThunk } from './redux/app/thunks'
import { RootState } from './redux/store'

const MessagesList = React.lazy(() => import('./components/MessagesBlock/MessagesList/MessagesList')) 
const PeoplePageContainer = React.lazy(() => import('./pages/PeoplePage/PeoplePageContainer'))
const MessengerContainer = React.lazy(() => import('./pages/MessengerPage/MessengerContainer'))
const PeopleContainer = React.lazy(() => import('./components/People/PeopleContainer'))
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'))
const Login = React.lazy(() => import('./pages/LoginPage/LoginPage'))

/* ------------- Component ------------- */
const App: React.FC<AppContainerProps> = ({ initializeAppThunk, isInitialized }) => {
  useEffect(() => {
    initializeAppThunk()
  }, [initializeAppThunk])

  if(!isInitialized) {
    <Preloader width="120px" height="120px" position="fixed" />
  }

  return (
    <div className={cl.appWrapper}>
      <HeaderContainer />
      <NavBar />
      <ChatListPopUpContainer/>
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
          </Route>
          <Route path="/users" element={withSuspense(PeoplePageContainer)}>
            <Route index element={withSuspense(FriendsContainer)}/>
            <Route path="all-people" element={withSuspense(PeopleContainer)}/>
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
    isInitialized: store.app.isInitialized,
  } 
}

const mapDispatchToProps = {
  initializeAppThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type AppContainerProps = ConnectedProps<typeof connector>
export default compose<any>(connector)(App)

