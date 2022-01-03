import cl from './Header.module.scss'

const Header:React.FC = () => {
  return (
    <header className={cl.header}>
      <a className={cl.header__logoContainer} href="#3">
        <div className={cl.header__logo}></div>
      </a>
    </header>
  )
}

export default Header
