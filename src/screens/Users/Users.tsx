import { IUser } from '../../redux/users/types'
import { UserIFollowItem } from '../PeopleIFollow/PeopleIFollow'
import { useOutletContext } from 'react-router-dom'

export type OutletContext = {
  usersList: IUser[]
  isSubscribePending: number[]
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  createDialogThunk: (userId: number) => void
}

const Users: React.FC = () => {
  const { usersList, isSubscribePending, toggleFollowOnUser, createDialogThunk } = useOutletContext<OutletContext>()

  return (
    <>
      {usersList.map((user) => (
        <UserIFollowItem
          key={user.id}
          user={user}
          isFollowing={isSubscribePending}
          toggleFollowOnUser={toggleFollowOnUser}
          createDialogThunk={createDialogThunk}
        />
      ))}
    </>
  )
}

export default Users
