import React from 'react'
import cl from './NavBar.module.scss'
import { NavLink } from 'react-router-dom'
import { DevelopersSvg, MessengerSvg, MyProfileSvg } from '../../helpers/icons/icons'
import NavItemSvg from '../common/NavItemSvg/NavItemSvg'

const NavBar: React.FC = () => {
  return (
    <aside className={cl.aside}>
      <nav className={cl.nav}>
        <NavLink className={cl.link} to="profile" ><NavItemSvg ComponentSvg={MyProfileSvg} textItem={'My profile'} /></NavLink>
        <NavLink className={cl.link} to="messenger" ><NavItemSvg ComponentSvg={MessengerSvg} textItem={'Messenger'} /></NavLink>
        <NavLink className={cl.link} to="people" ><NavItemSvg ComponentSvg={DevelopersSvg} textItem={'Developers'} /></NavLink>
        <NavLink className={cl.link} to="chat" ><NavItemSvg ComponentSvg={DevelopersSvg} textItem={'Chat'} /></NavLink>
      </nav>
      <nav className={cl.phoneNav}>
        <NavLink to="profile"><NavItemSvg ComponentSvg={MyProfileSvg}/></NavLink>
        <NavLink to="messenger"><NavItemSvg ComponentSvg={MessengerSvg}/></NavLink>
        <NavLink to="people"><NavItemSvg ComponentSvg={DevelopersSvg}/></NavLink>
      </nav>
    </aside>
  )
}

export default NavBar


/* <ul className={cl.list}>
          <li className={cl.aside__item}>
            <NavLink to="profile" className={isActiveLink} end>
              Profile
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink to="dialogs" className={isActiveLink}>
              Dialogs
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink to="users" className={isActiveLink}>
              Find users
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink to="following" className={isActiveLink}>
              People I follow
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink to="chat" className={isActiveLink}>
              Chat
            </NavLink>
          </li>
        </ul> */