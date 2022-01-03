import React from 'react'
import cl from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
// import { FriendCard } from './FriendCard'

const NavBar = ({ getFriends }) => {
  // const friendsList = getFriends.map((friend) => {
  //   return <FriendCard key={friend.id} friend={friend} />
  // })

  const isActiveLink = ({ isActive }) => {
    return isActive ? [cl.aside__link, cl.active].join(' ') : cl.aside__link
  }

  return (
    <aside className={cl.aside}>
      <nav className={cl.mainNav}>
        <ul>
          <li className={cl.aside__item}>
            <NavLink to="/" className={isActiveLink}>
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
            <NavLink to="music" className={isActiveLink}>
              Music
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink to="news" className={isActiveLink}>
              News
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink to="settings" className={isActiveLink}>
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        {/* //BUG change structure of sidebar */}
        <h2 className={cl.friendsTitle}>
          <a href="/">Friends</a>
        </h2>
        {/* <ul className={cl.friendsList}>{friendsList}</ul> */}
      </nav>
    </aside>
  )
}

export default NavBar
