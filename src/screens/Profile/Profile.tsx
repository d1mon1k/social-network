import cl from "./Profile.module.scss";
import { UserProfile } from "../../redux/profile/types";
import ProfileInfoBlock, { ProfileInfoFormCallBackType, ProfileInfoFormValuesType } from "./ProfileInfoBlock/ProfileInfoBlock";
import ProfilePhotoBlock from "./ProfilePhotoBlock/ProfilePhotoBlock";
import { useState } from "react";
import { SetUserRequiredBodyApi } from "../../api/profile";

interface ProfileProps {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  isProfilePhotoFetching: boolean
  isProfileStatusFetching: boolean
  setStatus: (status: string) => void
  setProfilePhoto: (file: File) => void
  setUserProfileThunk: (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => void
}

const Profile: React.FC<ProfileProps> = ({
  authProfileId,
  profile,
  status,
  isProfilePhotoFetching,
  isProfileStatusFetching,
  setProfilePhoto,
  setStatus,
  setUserProfileThunk
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className={cl.profile}>
      <ProfilePhotoBlock
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        authProfileId={authProfileId}
        profile={profile}
        isProfilePhotoFetching={isProfilePhotoFetching}
        setProfilePhoto={setProfilePhoto}
      />
      <ProfileInfoBlock
        setUserProfile={setUserProfileThunk}
        isEdit={isEdit}
        authProfileId={authProfileId}
        profile={profile}
        status={status}
        isProfileStatusFetching={isProfileStatusFetching}
        setStatus={setStatus}
      />
    </div>
  )
}

export default Profile
