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
  isProfilePhotoPending: boolean
  isProfileStatusPending: boolean
  sendMessageThunk: (userId: number, messageBody: string) => void
  setStatus: (status: string) => void
  setProfilePhoto: (file: File) => void
  setUserProfileThunk: (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => void
}

const Profile: React.FC<ProfileProps> = ({
  authProfileId,
  profile,
  status,
  isProfilePhotoPending,
  isProfileStatusPending,
  setProfilePhoto,
  setStatus,
  setUserProfileThunk,
  sendMessageThunk,
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className={cl.profile}>
      <ProfilePhotoBlock
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        authProfileId={authProfileId}
        profile={profile}
        isProfilePhotoFetching={isProfilePhotoPending}
        setProfilePhoto={setProfilePhoto}
        sendMessageThunk={sendMessageThunk}
      />
      <ProfileInfoBlock
        setUserProfile={setUserProfileThunk}
        isEdit={isEdit}
        authProfileId={authProfileId}
        profile={profile}
        status={status}
        isProfileStatusFetching={isProfileStatusPending}
        setStatus={setStatus}
      />
    </div>
  )
}

export default Profile
