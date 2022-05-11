import { NavLink, Outlet } from 'react-router-dom'
import { isActiveNavLink } from '../../helpers/helpers'
import cl from './People.module.scss'

const People = () => {
  return (
    <section className={cl.usersIFollowSection}>
      <Outlet />
      <nav className={cl.usersNav}>
        <NavLink to="developersIFollow" className={isActiveNavLink(cl.usersNavItem, cl.active)}>People I follow</NavLink>
        <NavLink to="developers" className={isActiveNavLink(cl.usersNavItem, cl.active)}>Find Developers</NavLink>
        <div className={cl.usersNavItem}>Placeholder</div>
        <div className={cl.usersNavItem}>Placeholder</div>
        <div className={cl.usersNavItem}>Placeholder</div>
      </nav>
    </section>
  )
}

export default People