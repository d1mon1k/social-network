import { useState } from 'react'
import { CrossSvg, SearchSvg } from '../../../helpers/icons/icons'
import { DialogType } from '../../../redux/messenger/types'
import ChatListPopUpItem from '../ChatListPopUpItem/ChatListPopUpItem'
import cl from './ChatListPopUp.module.scss'

/* ------------- Types ------------- */
interface ChatListPopUpProps {
  dialogs: DialogType[]
  setOpenedDialogs: React.Dispatch<React.SetStateAction<DialogType[]>>
  onChatListClickHandler: () => void
}

/* ------------- Component ------------- */
const ChatListPopUp: React.FC<ChatListPopUpProps> = ({
  dialogs,
  setOpenedDialogs,
  onChatListClickHandler
}) => {
  const [searchInput, setSearchInput] = useState('')

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => setSearchInput(target.value)

  const ChatListItems = dialogs
    .filter(dialog => dialog.userName.toLocaleLowerCase().includes(searchInput.toLowerCase()))
    .map(dialog => (
        <ChatListPopUpItem
          key={dialog.id}
          dialogItem={dialog}
          setOpenedDialogs={setOpenedDialogs}
        />
      ))

  return (
    <section className={cl.chatWindow}>
      <header className={cl.header}>
        <span>Chats</span>
        <CrossSvg onClick={onChatListClickHandler} />
      </header>
      <main className={cl.list}>
        {ChatListItems}
      </main>
      <footer className={cl.footer}>
        <SearchSvg />
        <input
          placeholder={'Search'}
          className={cl.searchInput}
          type="text"
          onChange={handleChange}
          value={searchInput}
        />
      </footer>
    </section>
  )
}

export default ChatListPopUp