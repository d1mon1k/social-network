import { NavLink } from 'react-router-dom'
import { isActiveNavLink } from '../../helpers/helpers'
import cl from './PeopleNav.module.scss'

const PeopleNav = () => {
  return (
    <nav className={cl.usersNav}>
      <NavLink to="/users" end className={isActiveNavLink(cl.usersNavItem, cl.active)} >People I follow</NavLink>
      <NavLink to="all-people" className={isActiveNavLink(cl.usersNavItem, cl.active)} >Find Developers</NavLink>
      <div className={cl.usersNavItem}>Placeholder</div>
      <div className={cl.usersNavItem}>Placeholder</div>
      <div className={cl.usersNavItem}>Placeholder</div>
    </nav>
  )
}

export default PeopleNav