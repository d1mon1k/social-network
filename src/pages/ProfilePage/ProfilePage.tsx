import { useState } from "react";
import InfoBlockContainer from "../../components/InfoBlock/InfoBlockContainer";
import PhotoBlockContainer from "../../components/PhotoBlock/PhotoBlockContainer";
import ProfileFriendsBlock from "../../components/ProfileFriendsBlock/ProfileFriendsBlock";
import ProfilePostsBlockContainer from "../../components/ProfilePostsBlock/ProfilePostsBlockContainer";
import { IUser } from "../../redux/users/types";
import cl from "./ProfilePage.module.scss";

/* ------------- Types ------------- */
interface ProfilePageProps {
  friends: IUser[]
  totalFriendsCount: number
}

/* ------------- Component ------------- */
const ProfilePage: React.FC<ProfilePageProps> = ({ friends, totalFriendsCount }) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <section className={cl.profile}>
      <div className={cl.leftCol}>
        <PhotoBlockContainer isEdit={isEdit} setIsEdit={setIsEdit} />
        <ProfileFriendsBlock friendsList={friends} friendsAmount={totalFriendsCount} />
      </div>
      <div className={cl.rightCol}>
        <InfoBlockContainer isEdit={isEdit}/>
        <ProfilePostsBlockContainer/>
      </div>
    </section>
  )
}

export default ProfilePage


