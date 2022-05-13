import cl from "./Profile.module.scss";
import { UserProfile } from "../../redux/profile/types";
import ProfileInfoBlock from "./ProfileInfoBlock/ProfileInfoBlock";
import ProfilePhotoBlock from "./ProfilePhotoBlock/ProfilePhotoBlock";

interface ProfileProps {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  isProfilePhotoFetching: boolean
  isProfileStatusFetching: boolean
  setStatus: (status: string) => void
  setProfilePhoto: (file: File) => void
}

const Profile: React.FC<ProfileProps> = ({
  authProfileId,
  profile,
  status,
  isProfilePhotoFetching,
  isProfileStatusFetching,
  ...props
}) => {
  return (
    <div className={cl.profile}>
      <ProfilePhotoBlock
        profile={profile}
        isProfilePhotoFetching={isProfilePhotoFetching}
        setProfilePhoto={props.setProfilePhoto}
      />
      <ProfileInfoBlock
        authProfileId={authProfileId}
        profile={profile}
        status={status}
        isProfileStatusFetching={isProfileStatusFetching}
        setStatus={props.setStatus}
      />
    </div>
  )
}

export default Profile
