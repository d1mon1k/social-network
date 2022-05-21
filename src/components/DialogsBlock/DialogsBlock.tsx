import { DialogType } from "../../redux/messenger/types"
import { DialogItem } from "./DialogItem/DialogItem"
import cl from './DialogsBlock.module.scss'

/* ------------- Types ------------- */
export interface DialogsBlockProps {
  dialogs: DialogType[]
}

/* ------------- Component ------------- */
const DialogsBlock: React.FC<DialogsBlockProps> = ({
  dialogs
}) => {
  return (
    <div className={cl.dialogsWrapper}>
      <ul className={cl.dialogs}>
        <DialogItem />
        {dialogs.map((dialog) => (<DialogItem key={dialog.id} dialogItem={dialog} />))}
      </ul>
    </div>
  )
}

export default DialogsBlock