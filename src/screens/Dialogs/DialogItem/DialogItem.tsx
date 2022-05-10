import cl from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'
import Avatar from '../../../components/Avatar/Avatar'

interface DialogItemProps {
  id: number
  name: string
  lastMessage: string
  time: number
  counter: number
  photo: string | undefined
}

export const DialogItem: React.FC<DialogItemProps> = (props) => {
  const isActiveLink = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? [cl.userLink, cl.active].join(' ') : cl.userLink
  }

  const prepareLine = (line: string) => (line.length > 26) ? `${line.substring(0, 26)}..` : line
  
  const prepareDate = (date: number) => {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
  }

  return (
    <li>
      <NavLink className={isActiveLink} to={`${props.id}`}>
        <div className={cl.avatar}>
          <Avatar photo={props.photo}/>
        </div>
        <div className={cl.name} >{prepareLine(props.name)}</div>
        <p className={cl.message}>{prepareLine(props.lastMessage)}</p>
        <time className={cl.time}>{prepareDate(props.time)}</time>
        <div className={cl.messageCounter}>{props.counter}</div>
      </NavLink>
    </li>
  )
}
