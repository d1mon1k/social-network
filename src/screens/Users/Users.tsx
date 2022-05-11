import cl from './Users.module.scss'
import { User } from './User/User'
import { IUser } from '../../redux/users/types'
import { useEffect, useRef } from 'react'
import Preloader from '../../components/common/Preloader/Preloader'
import { getPagesAmount } from '../../helpers/helpers'

interface UsersProps {
  totalUsersCount: number
  usersList: IUser[] | []
  pageItemsCount: number
  currentPage: number
  isSubscribePending: number[]
  isUsersFetching: boolean
  maxPageItemsCount: number
  toggleFollowOnUser: (id: number, followed: boolean) => void
  setCurrentUsersPage: (page: number) => void
}

const Users: React.FC<UsersProps> = ({
  setCurrentUsersPage,
  isUsersFetching,
  totalUsersCount,
  pageItemsCount,
  currentPage,
  maxPageItemsCount,
  ...props
}) => {
  const lastListElem = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (isUsersFetching) return
    observer.current && observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentPage < getPagesAmount(totalUsersCount, maxPageItemsCount) ) {
        setCurrentUsersPage(currentPage + 1)
      }
    })
    observer.current.observe(lastListElem.current!)
  }, [isUsersFetching, setCurrentUsersPage, currentPage, totalUsersCount, maxPageItemsCount])

  return (
      <ul className={cl.usersList}>
        {props.usersList.map((user) => (
          <User
            key={user.id}
            user={user}
            isFollowing={props.isSubscribePending}
            userFollow={props.toggleFollowOnUser}
          />
        ))}
        {isUsersFetching && (<Preloader width="50px" height="50px" position="absolute" />)}
        <div ref={lastListElem} />
      </ul>
  )
}

export default Users
