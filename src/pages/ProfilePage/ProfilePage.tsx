import { useState } from "react";
import { SetUserRequiredBodyApi } from "../../api/profile";
import PhotoBlockContainer from "../../components/PhotoBlock/PhotoBlockContainer";
import ProfileFriendsBlock from "../../components/ProfileFriendsBlock/ProfileFriendsBlock";
import ProfileInfoBlock, { ProfileInfoFormCallBackType } from "../../components/ProfileInfoBlock/ProfileInfoBlock";
import ProfilePostsBlockContainer from "../../components/ProfilePostsBlock/ProfilePostsBlockContainer";
import { UserProfile } from "../../redux/profile/types";
import { IUser } from "../../redux/users/types";
import cl from "./ProfilePage.module.scss";

interface ProfilePageProps {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  friends: IUser[]
  totalFriendsCount: number
  isProfileStatusPending: boolean
  setStatus: (status: string) => void
  setUserProfileThunk: (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => void
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  authProfileId,
  profile,
  status,
  friends,
  totalFriendsCount,
  isProfileStatusPending,
  setStatus,
  setUserProfileThunk,
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <section className={cl.profile}>
      <div className={cl.leftCol}>
        <PhotoBlockContainer
          isEdit={isEdit}
          setIsEdit={setIsEdit}
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

export default ProfilePage


