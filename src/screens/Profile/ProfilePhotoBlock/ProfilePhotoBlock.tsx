import { ArrowUpSvg, CrossSvg } from "../../../helpers/icons/icons"
import { UserProfile } from "../../../redux/profile/types"
import MyButton from "../../../components/common/MyButton/MyButton"
import Preloader from "../../../components/common/Preloader/Preloader"
import photoPlaceholder from '../../../assets/images/jpeg/no-photo.jpg'
import cl from './ProfilePhotoBlock.module.scss'

interface ProfilePhotoBlockProps {
  profile: UserProfile | undefined
  isProfilePhotoFetching: boolean
  setProfilePhoto: (file: File) => void
}

const ProfilePhotoBlock: React.FC<ProfilePhotoBlockProps> = ({
  isProfilePhotoFetching,
  profile,
  setProfilePhoto
}) => {
  return (
    <div className={cl.leftCol}>
      <div className={cl.photoBlock}>
        <div className={cl.photoContainer}>
          {
            isProfilePhotoFetching 
            ? (<Preloader position={'absolute'} width="40px" height="40px" />) 
            : (<img className={cl.photo} src={profile?.photos.large || photoPlaceholder} alt="" />)
          }
          <div className={cl.deletingPhotoBtn}><CrossSvg /></div>
          <div className={cl.updatingPhotoBlock}>
            <label htmlFor="file-upload">
              <ArrowUpSvg className={cl.updatePhotoSvg} />
              <span>Update photo</span>
            </label>
            <input id="file-upload" onChange={(e) => setProfilePhoto(e.target.files![0])} type="file" />
          </div>
        </div>
        <MyButton callBack={() => null}>Send message</MyButton>
      </div>
    </div>
  )
}

export default ProfilePhotoBlock