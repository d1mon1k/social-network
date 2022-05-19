import cl from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'
import Avatar from '../../../components/Avatar/Avatar'
import {
  convertDateFormat,
  getRightDateFormat,
  isActiveNavLink,
  reduceLine,
} from '../../../helpers/helpers'
import { DialogType } from '../../../redux/messenger/types'

interface DialogItemProps {
  dialogItem: DialogType
  setInterlocutor: React.Dispatch<React.SetStateAction<null | DialogType>>
}

export const DialogItem: React.FC<DialogItemProps> = ({
  dialogItem,
  setInterlocutor,
}) => {
  return (
    <li>
      <NavLink onClick={() => setInterlocutor(dialogItem)} className={isActiveNavLink(cl.userLink, cl.active)} to={`${dialogItem.id}`}>
        <div className={cl.avatar}>
          <Avatar photo={dialogItem.photos.small} />
        </div>
        <div className={cl.name}>{reduceLine(dialogItem.userName)}</div>
        <p className={cl.message}>{reduceLine('lorem lorem lorem lorem')}</p>
        <time className={cl.time}>{convertDateFormat(dialogItem.lastDialogActivityDate)}</time>
        {/* <time className={cl.time}>{getRightDateFormat(lastDialogActivity)}</time> */}
        {dialogItem.newMessagesCount > 0 && <div className={cl.messageCounter}>{dialogItem.newMessagesCount}</div>}
      </NavLink>
    </li>
  )
}
