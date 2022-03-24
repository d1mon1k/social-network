import cl from './Header.module.scss'
import logo from '../../assets/images/png/logo.png'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
// import menuBurger from '../../assets/images/svg/interfaceMob/menu-burger.svg'
// import message from '../../assets/images/svg/interfaceMob/message.svg'

interface Props {
  login: string | null
  authLogout: () => void
}

const Header: React.FC<Props> = (props) => {
  const loginTag = props.login ? <span>{props.login}</span> : <Link to='login' >login</Link>

  return (
    <header className={cl.header}>
      <a className={cl.logoContainer} href="#3">
        <div className={cl.logo}>
          <img src={logo} alt="" />
        </div>
        <span>Spacepark</span>
      </a>
      <div className={cl.currentUser}>
        {loginTag}
        <button onClick={props.authLogout} >Log out</button>
        <Avatar />
      </div>
      {/* <ul className={cl.menu}>
        <li className={cl.menuItem}>
          <i className={cl.menuBurger}></i>
        </li>
        <li className={cl.menuItem}>
          <i className={cl.message}></i>
        </li>
        <li className={cl.menuItem}></li>
        <li className={cl.menuItem}></li>
      </ul> */}
    </header>
  )
}

export default Header
