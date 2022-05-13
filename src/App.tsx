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

const PeopleContainer = React.lazy(() => import('./screens/People/PeopleContainer'))
const PeopleIFollow = React.lazy(() => import('./screens/PeopleIFollow/PeopleIFollow'))
const News = React.lazy(() => import('./screens/News/News'))
const Settings = React.lazy(() => import('./screens/Settings/Settings'))
const DialogsContainer = React.lazy(() => import('./screens/Dialogs/DialogsContainer'))
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
          <Route path="/dialogs/*" element={withSuspense(DialogsContainer)} />
          <Route path="/people" element={withSuspense(PeopleContainer)}>
            <Route path="developersIFollow" element={withSuspense(PeopleIFollow)}/>
            <Route path="developers" element={withSuspense(Users)}/>
          </Route>
          <Route path="/chat" element={withSuspense(News)} />
          <Route path="/settings" element={withSuspense(Settings)} />
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

