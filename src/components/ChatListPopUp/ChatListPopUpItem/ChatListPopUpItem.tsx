import { DialogType } from '../../../redux/messenger/types'
import Avatar from '../../Avatar/Avatar'
import cl from './ChatListPopUpItem.module.scss'

/* ------------- Types ------------- */
interface ChatWindowItemProps {
  dialogItem: DialogType
  setCurrentDialog: React.Dispatch<React.SetStateAction<DialogType | null>>
}

/* ------------- Component ------------- */
const ChatListPopUpItem: React.FC<ChatWindowItemProps> = ({ dialogItem, setCurrentDialog }) => {
  return (
    <div className={cl.listItem} onClick={() => setCurrentDialog(dialogItem)} >
      <div className={cl.avatarContainer}>
        <Avatar photo={dialogItem.photos.small} />
      </div>
      <span className={cl.dialogName}>{dialogItem.userName}</span>
    </div>
  )
}

export default ChatListPopUpItem