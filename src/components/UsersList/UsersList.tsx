import { IUser } from '../../redux/users/types'
import UserItem from './UserItem/UserItem'
import cl from './UsersList.module.scss'

/* ------------- Types ------------- */
interface UsersListProps {
  usersList: IUser[]
  isSubscribePending: number[]
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  createDialog: (userId: number) => void
}

/* ------------- Component ------------- */
const UsersList: React.FC<UsersListProps> = ({
  usersList,
  createDialog,
  isSubscribePending,
  toggleFollowOnUser,
}) => {  
  return (
    <>
      <div className={cl.usersList}>
        {usersList.map(user => (
          <UserItem
            key={user.id}
            user={user}
            isFollowing={isSubscribePending}
            toggleFollowOnUser={toggleFollowOnUser}
            createDialog={createDialog}
          />
          ))}
      </div>
    </>
  )
}

export default UsersList
