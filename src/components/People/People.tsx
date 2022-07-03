import { useEffect, useRef } from 'react'
import useObserver from '../../helpers/hooks/useObserver'
import { IUser } from '../../redux/users/types'
import Preloader from '../common/Preloader/Preloader'
import UsersList from '../UsersList/UsersList'

/* ------------- Types ------------- */
interface PeopleProps {
  usersData: { items: IUser[], totalItemsCount: number, currentPage: number }
  isSubscribePending: number[]
  isUsersFetching: boolean
  maxPageItemsCount: number
  searchInput: string
  fetchUsers: (maxPageItemsCount: number, term: string, friend: boolean) => Promise<void>
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  createDialog: (userId: number) => void
}

/* ------------- Component ------------- */
const People: React.FC<PeopleProps> = ({
  usersData,
  searchInput,
  isSubscribePending,
  isUsersFetching,
  toggleFollowOnUser,
  createDialog,
  maxPageItemsCount,
  fetchUsers,
}) => {
  const { currentPage, items, totalItemsCount } = usersData
  const observedElement = useRef<HTMLDivElement>(null)
  // const actualTotalCount = useRef(totalItemsCount) 
  // const actualCallBack = useRef(fetchUsers.bind(null, maxPageItemsCount, searchInput, false)) 
  const fetchUsersCallBack = fetchUsers.bind(null, maxPageItemsCount, searchInput, false)

  useEffect(() => {
    // actualTotalCount.current = totalItemsCount
  }, [totalItemsCount])

  useObserver(
    isUsersFetching,
    currentPage,
    totalItemsCount,
    maxPageItemsCount,
    fetchUsersCallBack,
    observedElement.current!
  )

  return (
    <>
      <UsersList
        usersList={items}
        isSubscribePending={isSubscribePending}
        toggleFollowOnUser={toggleFollowOnUser}
        createDialog={createDialog}
      />
      {isUsersFetching 
        ? (<Preloader width="50px" height="50px" position="absolute" />) 
        : (<div style={{height: '1px'}} ref={observedElement} />)
      }
    </>
  )
}

export default People