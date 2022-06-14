import { DialogType } from '../../../redux/messenger/types'
import Avatar from '../../Avatar/Avatar'
import cl from './ChatListPopUpItem.module.scss'

/* ------------- Types ------------- */
interface ChatWindowItemProps {
  dialogItem: DialogType
  setOpenedDialogs: React.Dispatch<React.SetStateAction<DialogType[]>>
}

/* ------------- Component ------------- */
const ChatListPopUpItem: React.FC<ChatWindowItemProps> = ({ dialogItem, setOpenedDialogs }) => {
  const handleClick = () => (
    setOpenedDialogs((prev) => prev.some((dialog) => dialog.id === dialogItem.id) ? [...prev] : [...prev, dialogItem])
  )

  return (
    <div className={cl.listItem} onClick={handleClick} >
      <div className={cl.avatarContainer}>
        <Avatar photo={dialogItem.photos.small} />
      </div>
      <span className={cl.dialogName}>{dialogItem.userName}</span>
    </div>
  )
}

export default ChatListPopUpItem