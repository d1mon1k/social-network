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
export const DialogItem: React.FC<DialogItemProps> = ({
  dialogItem,
}) => {
  return (
    <li>
      <NavLink className={isActiveNavLink(cl.userLink, cl.active)} to={`${dialogItem.id}`}>
        <div className={cl.avatar}>
          <Avatar photo={dialogItem.photos.small} />
        </div>
        <div className={cl.name}>{reduceLine(dialogItem.userName)}</div>
        <p className={cl.message}>{reduceLine('lorem lorem lorem lorem')}</p>
        <time className={cl.time}>{convertDateFormat(dialogItem.lastDialogActivityDate, false)}</time>
        {dialogItem.newMessagesCount > 0 && <div className={cl.messageCounter}>{dialogItem.newMessagesCount}</div>}
      </NavLink>
    </li>
  )
}
