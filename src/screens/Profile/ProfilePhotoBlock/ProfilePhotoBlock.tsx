import { ArrowSvg, ArrowUpSvg, AudioSvg, CrossSvg, PhotoSvg, VideoSvg } from "../../../helpers/icons/icons"
import { UserProfile } from "../../../redux/profile/types"
import MyButton from "../../../components/common/MyButton/MyButton"
import Preloader from "../../../components/common/Preloader/Preloader"
import photoPlaceholder from '../../../assets/images/jpeg/no-photo.jpg'
import cl from './ProfilePhotoBlock.module.scss'
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import Avatar from "../../../components/Avatar/Avatar"

interface ProfilePhotoBlockProps {
  authProfileId: number | undefined | null
  profile: UserProfile | undefined
  isProfilePhotoFetching: boolean
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  setProfilePhoto: (file: File) => void
  sendMessageThunk: (userId: number, messageBody: string) => void
}

const ProfilePhotoBlock: React.FC<ProfilePhotoBlockProps> = ({
  isProfilePhotoFetching,
  profile,
  setProfilePhoto,
  authProfileId,
  isEdit,
  setIsEdit,
  sendMessageThunk
}) => {
  const [sendMessagePopUp, setSendMessagePopUp] = useState(false)

  const isAuthenticatedUser = (profile && profile.userId) === authProfileId

  const onSaveChangesHandler = (e: FormEvent) => {
    if(isEdit) {
      document.getElementById('myForm')!
      .dispatchEvent(new Event('submit', { cancelable: true, bubbles:true }))
    }
    setIsEdit((prev: boolean) => !prev)
  }

  return (
    <>
      <SendMessagePopUp
       sendMessageThunk={sendMessageThunk}
       interlocutorId={profile?.userId}
       interlocutorName={profile?.fullName}
       interlocutorPhoto={profile?.photos.small}
       popUp={sendMessagePopUp}
       setPopUp={setSendMessagePopUp}
       />
      <div className={cl.leftCol}>
        <div className={cl.photoBlock}>
          <div className={cl.photoContainer}>
            {
              isProfilePhotoFetching 
              ? (<Preloader position={'absolute'} width="40px" height="40px" />) 
              : (<img className={cl.photo} src={profile?.photos.large || photoPlaceholder} alt="" />)
            }
            <div className={`${cl.deletingPhotoBtn} ${isEdit && cl.hover}`}><CrossSvg /></div>
            <div className={`${cl.updatingPhotoBlock} ${isEdit && cl.hover}`}>
              <label htmlFor="file-upload">
                <ArrowUpSvg className={cl.updatePhotoSvg} />
                <span>Update photo</span>
              </label>
              <input id="file-upload" onChange={(e) => setProfilePhoto(e.target.files![0])} type="file" />
            </div>
          </div>
          {isAuthenticatedUser ? (
            <MyButton className={cl.btn} callBack={(e) => onSaveChangesHandler(e)}>{isEdit ? 'Save' : 'Edit'}</MyButton>
          ) : (
            <MyButton callBack={() => setSendMessagePopUp(true)}>Write message</MyButton>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePhotoBlock

interface SendMessagePopUpProps {
  setPopUp: Dispatch<SetStateAction<boolean>>,
  popUp: boolean
  sendMessageThunk: (userId: number, message: string) => void
  interlocutorName: string | undefined,
  interlocutorId: number | undefined,
  interlocutorPhoto: string | undefined
}

const SendMessagePopUp: React.FC<SendMessagePopUpProps> = ({
  popUp,
  setPopUp,
  interlocutorName,
  interlocutorId,
  sendMessageThunk,
  interlocutorPhoto
}) => {
  const [messageField, setMessageField] = useState('')

  const handleMessageSending = (messageBody: string) => {
    sendMessageThunk(interlocutorId!, messageField)
    setPopUp(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageField(e.target.value)
    console.log(messageField)
  }

  return (
    <>
      {popUp && (
        <>
          <div className={cl.popUpContainer} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if((e.target as Element).className === `${cl.popUpContainer}`) {
              setPopUp(false)
            }
          }}>
          <div className={cl.popUp}>
            <div className={cl.flexRowContainer}>
              <div className={cl.newMessage}>New message</div>
              <Link className={cl.openChatBtn} to={`messenger/${interlocutorId}`}>Open full chat with {interlocutorName}</Link>
              <div onClick={() => setPopUp(false)}>
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
              <textarea value={messageField} onChange={handleChange} className={cl.popUpTextField}></textarea>
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
        </>
      )}
    </>
  )
}