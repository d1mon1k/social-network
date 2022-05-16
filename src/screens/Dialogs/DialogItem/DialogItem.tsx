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

export const DialogItem: React.FC<DialogItemProps> = ({
  counter,
  id,
  lastMessage,
  name,
  photo,
  time
}) => {
    return (
    <li>
      <NavLink className={isActiveNavLink(cl.userLink, cl.active)} to={`${id}`}>
        <div className={cl.avatar}>
          <Avatar photo={photo}/>
        </div>
        <div className={cl.name} >{reduceLine(name)}</div>
        <p className={cl.message}>{reduceLine(lastMessage)}</p>
        <time className={cl.time}>{getRightDateFormat(time)}</time>
        {(counter > 0) && <div className={cl.messageCounter}>{counter}</div>}
      </NavLink>
    </li>
  )
}
