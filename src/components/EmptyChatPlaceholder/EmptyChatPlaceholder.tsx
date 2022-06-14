import { ChatSvg } from '../../helpers/icons/icons';
import cl from './EmptyChatPlaceholder.module.scss';

/* ------------- Types ------------- */
interface EmptyChatPlaceholderProps {
  messagesLength: number | null
  isDialogSelected: boolean | undefined
}

/* ------------- Component ------------- */
const EmptyChatPlaceholder: React.FC<EmptyChatPlaceholderProps> = ({
  messagesLength,
  isDialogSelected
}) => {
  const tip = isDialogSelected === false ? 'Select a chat' : 'You can write your first message'

  return (
    <>
      {(messagesLength === 0 || isDialogSelected === false) && (
        <div className={cl.emptyChatPlaceholder}>
          <ChatSvg className={cl.svg} />
          <span className={cl.tip}>{tip}</span>
        </div>
      )}
    </>
  )
}

export default EmptyChatPlaceholder