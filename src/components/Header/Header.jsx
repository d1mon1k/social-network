import React from 'react'
import cl from './Header.module.css'

const Header = () => {
  return (
    <header className={cl.header}>
      <a className={cl.header__logoContainer} href="#3">
        <div className={cl.header__logo}></div>
      </a>
    </header>
  )
}

export default Header
