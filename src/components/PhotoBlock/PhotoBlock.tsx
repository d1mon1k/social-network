import React, { Dispatch, SetStateAction, useState } from "react"
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import { ArrowUpSvg, CrossSvg } from "../../helpers/icons/icons"
import { UserProfile } from "../../redux/profile/types"
import MyButton from "../common/MyButton/MyButton"
import Preloader from "../common/Preloader/Preloader"
import SendMessagePopUp from "../SendMessagePopUp/SendMessagePopUp"
import cl from './PhotoBlock.module.scss'

/* ------------- Types ------------- */
interface PhotoBlockProps {
  authProfileId: number | undefined | null
  profile: UserProfile | undefined
  isPhotoSending: boolean
  isSubscribePending: boolean
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  toggleSubscribe: (userId: number, followed: boolean) => void
  setProfilePhoto: (file: File) => void
  sendMessage: (userId: number, messageBody: string) => void
  createDialog: (userId: number) => void
}

/* ------------- Component ------------- */
const PhotoBlock: React.FC<PhotoBlockProps> = ({
  isPhotoSending,
  isSubscribePending: toggleFollowOnProfilePending,
  profile,
  setProfilePhoto,
  authProfileId,
  isEdit,
  setIsEdit,
  toggleSubscribe,
  sendMessage,
  createDialog,
}) => {
  const [isPopUp, setIsPopUp] = useState(false)
  const isAuthenticatedUser = (profile && profile.userId) === authProfileId

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => setProfilePhoto(e.target.files![0])
  
  const handleWriteMessageClick = () => setIsPopUp(true)
  
  const handleSaveChanges = () => {
    if(isEdit) {
      document.getElementById('myForm')!
      .dispatchEvent(new Event('submit', { cancelable: true, bubbles:true }))
    }
    setIsEdit(prev => !prev)
  }

  return (
    <>
      <SendMessagePopUp
        createDialog={createDialog}
        sendMessage={sendMessage}
        interlocutorId={profile?.userId}
        interlocutorName={profile?.fullName}
        interlocutorPhoto={profile?.photos.small}
        isPopUp={isPopUp}
        setIsPopUp={setIsPopUp}
      />
      <div className={cl.photoBlockWrapper}>
        <div className={cl.photoBlock}>
          <div className={cl.photoContainer}>
            {
              isPhotoSending 
              ? (<Preloader position={'absolute'} width="40px" height="40px" />) 
              : (<img className={cl.photo} src={profile?.photos.large || photoPlaceholder} alt="" />)
            }
            <div className={`${cl.deletingPhotoBtn} ${isEdit && cl.hover}`}><CrossSvg /></div>
            <div className={`${cl.updatingPhotoBlock} ${isEdit && cl.hover}`}>
              <label htmlFor="file-upload">
                <ArrowUpSvg className={cl.updatePhotoSvg} />
                <span>Update photo</span>
              </label>
              <input id="file-upload" onChange={handleFileUpload} type="file" />
            </div>
          </div>
          {isAuthenticatedUser ? (
            <MyButton className={cl.btn} callBack={handleSaveChanges}>{isEdit ? 'Save' : 'Edit'}</MyButton>
          ) : (
            <>
              <MyButton callBack={handleWriteMessageClick}>Write message</MyButton>
              <MyButton 
                disabled={toggleFollowOnProfilePending} 
                callBack={()=>{toggleSubscribe(profile!.userId, profile!.followed)}}
                children={profile?.followed ? 'Unfollow' : 'Follow'}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default PhotoBlock

