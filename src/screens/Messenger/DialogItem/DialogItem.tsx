import cl from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'
import Avatar from '../../../components/Avatar/Avatar'
import {
  convertDateFormat,
  getRightDateFormat,
  isActiveNavLink,
  reduceLine,
} from '../../../helpers/helpers'

interface DialogItemProps {
  id: number
  userName: string
  lastDialogActivity: string
  newMessagesCounter: number
  photo: string | null
  setInterlocutorPhoto: React.Dispatch<React.SetStateAction<null | string>>
}

export const DialogItem: React.FC<DialogItemProps> = ({
  id,
  lastDialogActivity,
  newMessagesCounter,
  photo,
  userName,
  setInterlocutorPhoto,
}) => {
  return (
    <li>
      <NavLink onClick={() => setInterlocutorPhoto(photo)} className={isActiveNavLink(cl.userLink, cl.active)} to={`${id}`}>
        <div className={cl.avatar}>
          <Avatar photo={photo} />
        </div>
        <div className={cl.name}>{reduceLine(userName)}</div>
        <p className={cl.message}>{reduceLine('lorem lorem lorem lorem')}</p>
        <time className={cl.time}>{convertDateFormat(lastDialogActivity)}</time>
        {/* <time className={cl.time}>{getRightDateFormat(lastDialogActivity)}</time> */}
        {newMessagesCounter > 0 && <div className={cl.messageCounter}>{newMessagesCounter}</div>}
      </NavLink>
    </li>
  )
}
