import cl from './Header.module.scss'
import logo from '../../assets/images/png/logo.png'
// import menuBurger from '../../assets/images/svg/interfaceMob/menu-burger.svg'
// import message from '../../assets/images/svg/interfaceMob/message.svg'

const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <a className={cl.logoContainer} href="#3">
        <div className={cl.logo}>
          <img src={logo} alt="" />
        </div>
        <span>Spacepark</span>
      </a>
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
