import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { compose } from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import Root from './components/Root/Root'
import { withSuspense } from './helpers/helpers'
import ProfileContainer from './pages/ProfilePage/ProfilePageContainer'
import { initializeAppThunk } from './redux/app/thunks'
import { RootState } from './redux/store'

const MessagesList = React.lazy(() => import('./components/MessagesBlock/MessagesList/MessagesList')) 
const PeoplePageContainer = React.lazy(() => import('./pages/PeoplePage/PeoplePageContainer'))
const MessengerContainer = React.lazy(() => import('./pages/MessengerPage/MessengerPageContainer'))
const PeopleContainer = React.lazy(() => import('./components/People/PeopleContainer'))
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'))
const Login = React.lazy(() => import('./pages/LoginPage/LoginPage'))

/* ------------- Component ------------- */
const App: React.FC<AppContainerProps> = ({ initializeAppThunk, isInitialized }) => {
  useEffect(() => {
    initializeAppThunk()
  }, [initializeAppThunk])

  if(!isInitialized) {
    return <Preloader width="120px" height="120px" position="fixed" />
  }

  return (
    <Routes>
      <Route path="*" element={<div>404 not found</div>}/>
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/" element={<Root/>}>
        <Route index element={<ProfileContainer />} />
        <Route path="/profile">
          <Route index element={<ProfileContainer />} />
          <Route path=":userId" element={<ProfileContainer />} />
        </Route>
        <Route path="/messenger" element={withSuspense(MessengerContainer)}>
          <Route path=":userId" element={withSuspense(MessagesList)} />
        </Route>
        <Route path="/users" element={withSuspense(PeoplePageContainer)}>
          <Route index element={withSuspense(FriendsContainer)}/>
          <Route path="all-people" element={withSuspense(PeopleContainer)}/>
        </Route>
      </Route>
    </Routes>
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

