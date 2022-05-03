import './App.scss'
import NavBar from './components/NavBar/NavBar'
import Music from './screens/Music/Music'
import News from './screens/News/News'
import Settings from './screens/Settings/Settings'
import { Routes, Route } from 'react-router-dom'
import DialogsContainer from './screens/Dialogs/DialogsContainer'
import UsersContainer from './screens/Users/UsersContainer'
import ProfileContainer from './screens/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './screens/Login/Login'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './redux/store'
import Preloader from './components/Common/Preloader/Preloader'
import { compose } from 'redux'
import { initializeAppThunk } from './redux/app/thunks'


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
          <Route path="/login" element={<Login/>} />
          <Route path="/profile">
            <Route index element={<ProfileContainer />} />
            <Route path=":userId" element={<ProfileContainer />} />
          </Route>
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/music" element={<Music />} />
          <Route path="/news" element={<News />} />
          <Route path="/settings" element={<Settings />} />
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

