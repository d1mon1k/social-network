import { useOutletContext } from 'react-router-dom'
import { PeoplePageOutletContext } from '../PeoplePage/PeoplePage'
import UserItem from '../../components/UsersList/UserItem/UserItem'

const UsersList: React.FC = () => {
  const {
    usersList,
    isSubscribePending,
    toggleFollowOnUser,
    createDialogThunk,
  } = useOutletContext<PeoplePageOutletContext>() //PeoplePage

  return (
    <>
      {usersList.map((user) => (
        <UserItem
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

export default UsersList
