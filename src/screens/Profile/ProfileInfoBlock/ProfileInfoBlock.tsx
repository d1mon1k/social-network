import cl from './ProfileInfoBlock.module.scss'
import { makeFirstLetterUppercase } from '../../../helpers/helpers'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import { UserProfile } from '../../../redux/profile/types'
import Preloader from '../../../components/common/Preloader/Preloader'
import { useState } from 'react'

interface ProfileInfoBlockProps {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  isProfileStatusFetching: boolean
  setStatus: (status: string) => void
}

const ProfileInfoBlock: React.FC<ProfileInfoBlockProps> = ({
  authProfileId,
  isProfileStatusFetching,
  profile,
  setStatus,
  status,
}) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <section className={cl.infoBlock}>
      <div className={cl.mainInfo}>
        <h2 className={cl.name}>{makeFirstLetterUppercase(profile?.fullName)}</h2>
        {isProfileStatusFetching ? (
          <Preloader
            position={'absolute'}
            width="23px"
            height="23px"
            margin="7px auto 12px auto"
          />
        ) : (
          <ProfileStatus
            currentUserId={profile ? profile.userId : null}
            authProfileId={authProfileId}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>
      <DividerBlock/>
      <div className={cl.additionalInfo}>
        <div className={cl.infoRow}>
          <div className={cl.firstCol}>Looking for a job:</div>
          <div>{profile && profile.lookingForAJob}</div>
        </div>
        <div onClick={() => setShowInfo(!showInfo)} className={cl.showInfoBtn} >
          {!showInfo ? 'Show full information' : 'Hide full information'}
        </div>
        <DividerBlock dividerName={'Main information'} />
        <div className={cl.infoRow}>
          <div className={cl.firstCol}>About me:</div>
          <div>{profile && profile.aboutMe}</div>
        </div>
        <div className={cl.infoRow}>
          <div className={cl.firstCol}>My professional skills:</div>
          <div>{profile && profile.lookingForAJobDescription}</div>
        </div>
        <DividerBlock dividerName={'Contact information'} />
        <div className={cl.contacts}>
          {profile &&
            Object.entries(profile.contacts).map(([network, value]) => {
              return (
                <div className={cl.infoRow} key={network}>
                  <div className={cl.firstCol}>{network}:</div>
                  <div>{value}</div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

/* ------------- DividerBlock component ------------- */
interface DividerNameProps {
  dividerName?: string
}

const DividerBlock: React.FC<DividerNameProps> = ({dividerName}) => {
  return (
    <div className={cl.dividerBlock}>
      {dividerName && <div className={cl.dividerName}>{dividerName}</div>}
      <div className={cl.divider}></div>
    </div>
  )
}

export default ProfileInfoBlock
