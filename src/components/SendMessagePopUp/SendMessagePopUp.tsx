import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowSvg, AudioSvg, CrossSvg, PhotoSvg, VideoSvg } from "../../helpers/icons/icons"
import Avatar from "../Avatar/Avatar"
import MyButton from "../common/MyButton/MyButton"
import cl from './SendMessagePopUp.module.scss'

interface SendMessagePopUpProps {
  isPopUp: boolean
  setIsPopUp: Dispatch<SetStateAction<boolean>>,
  interlocutorId: number | undefined,
  interlocutorName: string | undefined,
  interlocutorPhoto: string | undefined
  sendMessage: (userId: number, message: string) => void
  createDialog: (userId: number) => void
}

const SendMessagePopUp: React.FC<SendMessagePopUpProps> = ({
  isPopUp,
  setIsPopUp,
  interlocutorId,
  interlocutorName,
  interlocutorPhoto,
  sendMessage,
  createDialog,
}) => {
  const [messageField, setMessageField] = useState('')
  const navigate = useNavigate()

  const handleMessageSending = () => {
    sendMessage(interlocutorId!, messageField)
    setIsPopUp(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageField(e.target.value)
  }

  const handleCreateDialog = async () => {
    await createDialog(interlocutorId!)
    navigate(`/messenger/${interlocutorId}`)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).className === cl.popUpContainer) {
      setIsPopUp(false)
    }
  }

  return (
    <>
      {isPopUp && (
        <div className={cl.popUpContainer} onClick={handleClick} >
          <div className={cl.popUp}>
            <div className={cl.flexRowContainer}>
              <div className={cl.newMessage}>New message</div>
              <div onClick={handleCreateDialog} className={cl.openChatBtn}>
                Open full chat with {interlocutorName}
              </div>
              <div onClick={() => setIsPopUp(false)}>
                <CrossSvg className={cl.closePopUpBtn} />
              </div>
            </div>
            <div className={cl.profileInfo}>
              <div className={cl.avatarContainer}>
                <Avatar photo={interlocutorPhoto} />
              </div>
              <div className={cl.infoColumn}>
                <span className={cl.fullName}>{interlocutorName}</span>
                <span className={cl.lastActivity}>seen recently</span>
              </div>
            </div>
            <div className={cl.textAreaContainer}>
              <textarea
                value={messageField}
                onChange={handleChange}
                className={cl.popUpTextField}
              ></textarea>
            </div>
            <div className={cl.flexRowFooter}>
              <div className={cl.attachments}>
                <PhotoSvg className={cl.btnSvg} />
                <VideoSvg className={cl.btnSvg} />
                <AudioSvg className={cl.btnSvg} />
                <div className={cl.moreBtn}>
                  <span>More</span>
                  <ArrowSvg className={cl.btnSvg} />
                </div>
              </div>
              <div className={cl.btnContainer}>
                <MyButton callBack={handleMessageSending}>Send</MyButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SendMessagePopUp