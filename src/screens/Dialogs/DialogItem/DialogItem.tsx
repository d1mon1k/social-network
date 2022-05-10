import cl from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'
import Avatar from '../../../components/Avatar/Avatar'
import { getRightDateFormat, isActiveNavLink, reduceLine } from '../../../helpers/helpers'

interface DialogItemProps {
  id: number
  name: string
  lastMessage: string
  time: number
  counter: number
  photo: string | undefined
}

export const DialogItem: React.FC<DialogItemProps> = (props) => {
    return (
    <li>
      <NavLink className={isActiveNavLink(cl.userLink, cl.active)} to={`${props.id}`}>
        <div className={cl.avatar}>
          <Avatar photo={props.photo}/>
        </div>
        <div className={cl.name} >{reduceLine(props.name)}</div>
        <p className={cl.message}>{reduceLine(props.lastMessage)}</p>
        <time className={cl.time}>{getRightDateFormat(props.time)}</time>
        <div className={cl.messageCounter}>{props.counter}</div>
      </NavLink>
    </li>
  )
}
