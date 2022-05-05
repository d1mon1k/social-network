import './App.scss'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './redux/store'
import { compose } from 'redux'
import { initializeAppThunk } from './redux/app/thunks'
import NavBar from './components/NavBar/NavBar'
import HeaderContainer from './components/Header/HeaderContainer'
import Preloader from './components/Common/Preloader/Preloader'
import ProfileContainer from './screens/Profile/ProfileContainer'
const Music = React.lazy(() => import('./screens/Music/Music'))
const News = React.lazy(() => import('./screens/News/News'))
const Settings = React.lazy(() => import('./screens/Settings/Settings'))
const DialogsContainer = React.lazy(() => import('./screens/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./screens/Users/UsersContainer'))
const Login = React.lazy(() => import('./screens/Login/Login'))


const App: React.FC<PropsFromRedux> = (props) => {
  useEffect(() => {
    props.initializeAppThunk()
  })

  if(!props.isInitialized) {
    return <Preloader/>
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />	
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ProfileContainer/>} />
          <Route path="/profile">
            <Route index element={<ProfileContainer />} />
            <Route path=":userId" element={<ProfileContainer />} />
          </Route>
            <Route path="/login" element={<React.Suspense fallback={<Preloader/>}><Login/></React.Suspense>} />
            <Route path="/dialogs/*" element={<React.Suspense fallback={<Preloader/>}><DialogsContainer /></React.Suspense>} />
            <Route path="/users" element={<React.Suspense fallback={<Preloader/>}><UsersContainer /></React.Suspense>} />
            <Route path="/music" element={<React.Suspense fallback={<Preloader/>}><Music /></React.Suspense>} />
            <Route path="/news" element={<React.Suspense fallback={<Preloader/>}><News /></React.Suspense>} />
            <Route path="/settings" element={<React.Suspense fallback={<Preloader/>}><Settings /></React.Suspense>} />
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

