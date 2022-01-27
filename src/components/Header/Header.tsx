import cl from './Header.module.scss'
import logo from '../../assets/images/png/logo.png'

const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <a className={cl.logoContainer} href="#3">
        <div className={cl.logo}>
          <img src={logo} alt="" />
        </div>
        <span>Spacepark</span>
      </a>
    </header>
  )
}

export default Header
