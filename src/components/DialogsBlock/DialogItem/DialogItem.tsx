import { NavLink } from 'react-router-dom'
import {
  convertDateFormat,
  isActiveNavLink,
  reduceLine,
} from '../../../helpers/helpers'
import { DialogType } from '../../../redux/messenger/types'
import Avatar from '../../Avatar/Avatar'
import cl from './DialogItem.module.scss'

/* ------------- Types ------------- */
interface DialogItemProps {
  dialogItem: DialogType
}

/* ------------- Component ------------- */
export const DialogItem: React.FC<DialogItemProps> = ({ dialogItem }) => {
  const name = reduceLine(dialogItem.userName, 26)
  const path = dialogItem.id === 9999999 ? 'chat' : dialogItem.id

  return (
    <li>
      <NavLink className={isActiveNavLink(cl.userLink, cl.active)} to={`${path}`}>
        <div className={cl.avatar}>
          <Avatar photo={dialogItem.photos.small} />
        </div>
        <div className={cl.name}>{name}</div>
        <p className={cl.message}>{reduceLine('last message placeholder', 26)}</p>
        <time className={cl.time}>{convertDateFormat(dialogItem.lastDialogActivityDate, false)}</time>
        {dialogItem.newMessagesCount > 0 && <div className={cl.messageCounter}>{dialogItem.newMessagesCount}</div>}
      </NavLink>
    </li>
  )
}
