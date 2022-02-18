import './App.scss'
import NavBar from './components/NavBar/NavBar'
import Music from './components/Music/Music'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import { Routes, Route } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'

const App: React.FC = () => {
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

export default App
