import { improveFullName } from '../../../helpers/helpers'
import { ProfileType } from '../../../store/types/profile-types'
import { MyButton } from '../../Common/MyButton/MyButton'
import cl from './ProfileInfo.module.scss'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'

interface Props {
  profile: ProfileType | null
  status: string | null
  setStatus: (status: string) => void
  authProfileId: number | null
}

const ProfileInfo: React.FC<Props> = ({authProfileId, profile, status, ...props }) => {
  return (
    <div className={cl.profileInfo}>
      <div className={cl.leftCol}>
        <div className={cl.photoBlock}>
          <img className={cl.photo} src={profile?.photos.large} alt="" />
          <MyButton callBack={() => null}>Send message</MyButton>
        </div>
      </div>
      <div className={cl.rightCol}>
        <article className={cl.info}>
          <div className={cl.primaryInfo}>
            <h2 className={cl.name}>{improveFullName(profile?.fullName)}</h2>
            <ProfileStatus curUserId={profile ? profile.userId : null} authProfileId={authProfileId} status={status} setStatus={props.setStatus} />
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
