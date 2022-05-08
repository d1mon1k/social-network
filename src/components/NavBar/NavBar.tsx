import React from 'react'
import cl from './NavBar.module.scss'
import { NavLink } from 'react-router-dom'
// import { FriendCard } from './FriendCard'

const NavBar: React.FC = () => {
  // const friendsList = getFriends.map((friend) => {
  //   return <FriendCard key={friend.id} friend={friend} />
  // })

  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? [cl.aside__link, cl.active].join(' ') : cl.aside__link
  }

  return (
    <aside className={cl.aside}>
      <nav className={cl.mainNav}>
        <ul className={cl.list}>
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
          {/* <li className={cl.aside__item}>
            <NavLink to="settings" className={isActiveLink}>
              Settings
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <nav>
        {/* //BUG change structure of sidebar */}
        {/* <h2 className={cl.friendsTitle}>
          <a href="/">Friends</a>
        </h2> */}
        {/* <ul className={cl.friendsList}>{friendsList}</ul> */}
      </nav>
    </aside>
  )
}

export default NavBar
