import cl from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'

export const DialogItem = (props) => {
  const isActiveLink = ({ isActive }) => {
    return isActive ? [cl.userName, cl.active].join(' ') : cl.userName
  }

  return (
    <li className={cl.userItem}>
      <NavLink className={isActiveLink} to={`${props.id}`}>
        {props.name}
      </NavLink>
    </li>
  )
}
