import cl from './ProfileInfo.module.scss'
import { makeFirstLetterUppercase } from '../../../helpers/helpers'
import { MyButton } from '../../../components/common/MyButton/MyButton'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import { UserProfile } from '../../../redux/profile/types'
import photoPlaceholder from '../../../assets/images/jpeg/no-photo.jpg'

interface Props {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  setStatus: (status: string) => void
  setProfilePhoto: (file: File) => void
}

const ProfileInfo: React.FC<Props> = ({
  authProfileId,
  profile,
  status,
  ...props
}) => {
  return (
    <div className={cl.profileInfo}>
      <div className={cl.leftCol}>
        <div className={cl.photoBlock}>
          <div className={cl.photoContainer}>
            <img
              className={cl.photo}
              src={profile?.photos.large || photoPlaceholder}
              alt=""
            />
            <div className={cl.updatingPhotoBlock}>
              <input
                onChange={(e) => props.setProfilePhoto(e.target.files![0])}
                type="file"
                className={cl.updatePhotoBtn}
              />
            </div>
          </div>
          <MyButton callBack={() => null}>Send message</MyButton>
        </div>
      </div>
      <div className={cl.rightCol}>
        <article className={cl.info}>
          <div className={cl.primaryInfo}>
            <h2 className={cl.name}>{makeFirstLetterUppercase(profile?.fullName)}</h2>
            <ProfileStatus
              curUserId={profile ? profile.userId : null}
              authProfileId={authProfileId}
              status={status}
              setStatus={props.setStatus}
            />
          </div>
          <div className={cl.additionalInfo}>
            <div className={cl.firstCol}>Facebook:</div>
            <div>{profile?.contacts.facebook}</div>
            <div className={cl.firstCol}>Github:</div>
            <div>{profile?.contacts.github}</div>
            <div className={cl.firstCol}>Vk:</div>
            <div>{profile?.contacts.vk}</div>
            <div className={cl.firstCol}>Instagram:</div>
            <div>{profile?.contacts.instagram}</div>
            <div className={cl.firstCol}>Twitter:</div>
            <div>{profile?.contacts.twitter}</div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ProfileInfo
