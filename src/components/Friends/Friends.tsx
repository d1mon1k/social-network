import { useEffect, useRef } from 'react'
import { getPagesAmount } from '../../helpers/helpers'
import { IUser } from '../../redux/users/types'
import Preloader from '../common/Preloader/Preloader'
import UsersList from '../UsersList/UsersList'

/* ------------- Types ------------- */
interface FriendsProps {
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
const Friends: React.FC<FriendsProps> = ({
  usersData,
  searchInput,
  isSubscribePending,
  isUsersFetching,
  toggleFollowOnUser,
  createDialog,
  maxPageItemsCount,
  fetchUsers
}) => {
  const { currentPage, items, totalItemsCount } = usersData
  const observedElement = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const actualTotalCount = useRef(totalItemsCount) 

  useEffect(() => {
    actualTotalCount.current = totalItemsCount
  }, [totalItemsCount])

  useEffect(() => {
    if (isUsersFetching) return
    if (observer.current) observer.current.disconnect()
    
    const callBack = (entries: IntersectionObserverEntry[]): void => {
      if (
        entries[0].isIntersecting 
        && currentPage < getPagesAmount(actualTotalCount.current, maxPageItemsCount) 
        && !isUsersFetching
      ) {
        fetchUsers(maxPageItemsCount, searchInput, true) 
      }
    }
    observer.current = new IntersectionObserver(callBack)
    observer.current.observe(observedElement.current!)
  }, [isUsersFetching])

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

export default Friends