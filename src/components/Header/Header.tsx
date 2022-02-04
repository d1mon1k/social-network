import cl from './Header.module.scss'
import logo from '../../assets/images/png/logo.png'
import Avatar from '../Avatar/Avatar'
// import menuBurger from '../../assets/images/svg/interfaceMob/menu-burger.svg'
// import message from '../../assets/images/svg/interfaceMob/message.svg'

interface Props {
  login: string
}

const Header: React.FC<Props> = (props) => {
  return (
    <header className={cl.header}>
      <a className={cl.logoContainer} href="#3">
        <div className={cl.logo}>
          <img src={logo} alt="" />
        </div>
        <span>Spacepark</span>
      </a>
      <div className={cl.currentUser}>
        <span>{props.login}</span>
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
