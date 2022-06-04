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
  dialogItem?: DialogType
}

/* ------------- Component ------------- */
export const DialogItem: React.FC<DialogItemProps> = ({
  dialogItem,
}) => {
  const path = dialogItem ? dialogItem.id : 'chat'
  const name = dialogItem ? reduceLine(dialogItem.userName, 26) : 'WebSocket Chat'

  return (
    <li>
      <NavLink className={isActiveNavLink(cl.userLink, cl.active)} to={`${path}`}>
        <div className={cl.avatar}>
          <Avatar photo={dialogItem && dialogItem.photos.small} />
        </div>
        <div className={cl.name}>{name}</div>
        <p className={cl.message}>{reduceLine('last message placeholder', 26)}</p>
        <time className={cl.time}>{dialogItem && convertDateFormat(dialogItem.lastDialogActivityDate, false)}</time>
        {dialogItem && dialogItem.newMessagesCount > 0 && <div className={cl.messageCounter}>{dialogItem && dialogItem.newMessagesCount}</div>}
      </NavLink>
    </li>
  )
}
