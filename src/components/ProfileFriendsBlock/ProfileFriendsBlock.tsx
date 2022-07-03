import { Link } from "react-router-dom";
import { reduceLine } from "../../helpers/helpers";
import { IUser } from "../../redux/users/types"
import Avatar from "../Avatar/Avatar"
import cl from './ProfileFriendsBlock.module.scss';

/* ------------- Types ------------- */
interface ProfileFriendsBlockProps {
  friendsAmount: number
  friendsList: IUser[]
}

/* ------------- Component ------------- */
const ProfileFriendsBlock: React.FC<ProfileFriendsBlockProps> = ({ friendsAmount, friendsList }) => {
  return (
    <div className={cl.friendsBlock}>
      <Link to={'/users'} className={cl.header}>
        <span>Friends</span>
        <span className={cl.amount}>{friendsAmount}</span>
      </Link>
      <div className={cl.friendsGrid}>
        {friendsList &&
          friendsList.map((friend) => {
            return (
              <div key={friend.id} className={cl.friend}>
                <div className={cl.avatarContainer}>
                  <Avatar photo={friend.photos.small} userId={friend.id} />
                </div>
                <Link to={`/profile/${friend.id}`} className={cl.fullName}>
                  {reduceLine(friend.name, 7)}
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ProfileFriendsBlock