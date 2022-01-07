import cl from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'

interface Props {
  key: number
  id: number
  name: string
}

export const DialogItem: React.FC<Props> = (props) => {
  const isActiveLink = ({ isActive }: { isActive: boolean }): string => {
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
