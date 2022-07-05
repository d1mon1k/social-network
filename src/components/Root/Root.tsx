import { Outlet } from "react-router-dom"
import ChatWindowContainer from "../ChatWindow/ChatWindowContainer"
import HeaderContainer from "../Header/HeaderContainer"
import NavBar from "../NavBar/NavBar"
import cl from './Root.module.scss'

const Root = () => {
  return (
    <div className={cl.appWrapper}>
      <HeaderContainer />
      <NavBar />
      <ChatWindowContainer/>
      <div className={cl.mainContent}>
        <Outlet/>
      </div>
    </div>
  )
}

export default Root