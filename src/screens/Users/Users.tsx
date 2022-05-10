import cl from './Users.module.scss'
import { User } from './User/User'
import { IUser } from '../../redux/users/types'
import { useEffect, useRef } from 'react'
import Preloader from '../../components/common/Preloader/Preloader'

interface UsersProps {
  totalUsersCount: number
  usersList: IUser[] | []
  pageItemsCount: number
  currentPage: number
  isSubscribePending: number[]
  isUsersFetching: boolean
  setCurrentPage: (currentPage: number) => void
  toggleFollowOnUser: (id: number, followed: boolean) => void
}

const Users: React.FC<UsersProps> = ({isUsersFetching, totalUsersCount: totalCount, pageItemsCount, currentPage, setCurrentPage, ...props }) => {
  const lastListElem = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if(isUsersFetching) return
    observer.current && observer.current.disconnect()
    
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && currentPage < totalCount) {
        setCurrentPage(currentPage + 1)
      }
    })
    observer.current.observe(lastListElem.current!)
  }, [isUsersFetching, currentPage, totalCount, setCurrentPage])

  return (
    <>
     {/* <section className={cl.usersSection}> */}
      <ul className={cl.usersList}>
        {props.usersList.map((user) => (
          <User
            key={user.id}
            user={user}
            isFollowing={props.isSubscribePending}
            userFollow={props.toggleFollowOnUser}
          />
        ))}
      </ul>
      <div ref={lastListElem}/>
      {isUsersFetching && <Preloader width='50px' height='50px' position='absolute'/>}
     {/* </section> */}
    </>
  )
}

export default Users
