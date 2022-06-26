import { useState } from "react";
import { SetUserRequiredBodyApi } from "../../api/profile";
import ProfileFriendsBlock from "../../components/ProfileFriendsBlock/ProfileFriendsBlock";
import ProfilePostsBlockContainer from "../../components/ProfilePostsBlock/ProfilePostsBlockContainer";
import { UserProfile } from "../../redux/profile/types";
import { IUser } from "../../redux/users/types";
import cl from "./Profile.module.scss";
import ProfileInfoBlock, { ProfileInfoFormCallBackType } from "./ProfileInfoBlock/ProfileInfoBlock";
import ProfilePhotoBlock from "./ProfilePhotoBlock/ProfilePhotoBlock";

interface ProfileProps {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  friends: IUser[]
  totalFriendsCount: number
  isProfilePhotoPending: boolean
  isProfileStatusPending: boolean
  toggleFollowOnProfilePending: boolean
  toggleFollowOnProfileThunk: (userId: number, followed: boolean) => void
  sendMessageThunk: (userId: number, messageBody: string) => void
  setStatus: (status: string) => void
  setProfilePhoto: (file: File) => void
  setUserProfileThunk: (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => void
  createDialogThunk: (userId: number) => void
}

const Profile: React.FC<ProfileProps> = ({
  authProfileId,
  profile,
  status,
  friends,
  totalFriendsCount,
  isProfilePhotoPending,
  isProfileStatusPending,
  toggleFollowOnProfilePending,
  setProfilePhoto,
  setStatus,
  toggleFollowOnProfileThunk,
  setUserProfileThunk,
  sendMessageThunk,
  createDialogThunk
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <section className={cl.profile}>
      <div className={cl.leftCol}>
        <ProfilePhotoBlock
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          authProfileId={authProfileId}
          profile={profile}
          isProfilePhotoFetching={isProfilePhotoPending}
          toggleFollowOnProfilePending={toggleFollowOnProfilePending}
          setProfilePhoto={setProfilePhoto}
          toggleFollowOnProfileThunk={toggleFollowOnProfileThunk}
          createDialogThunk={createDialogThunk}
          sendMessageThunk={sendMessageThunk}
        />
        <ProfileFriendsBlock 
          friendsList={friends} 
          friendsAmount={totalFriendsCount} 
        />
      </div>
      <div className={cl.rightCol}>
        <ProfileInfoBlock
          setUserProfile={setUserProfileThunk}
          friendsAmount={totalFriendsCount}
          isEdit={isEdit}
          authProfileId={authProfileId}
          profile={profile}
          status={status}
          isProfileStatusFetching={isProfileStatusPending}
          setStatus={setStatus}
        />
        <ProfilePostsBlockContainer/>
      </div>
    </section>
  )
}

export default Profile


