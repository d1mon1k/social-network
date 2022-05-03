import cl from './Users.module.scss'
import { User } from './User/User'
import { IUser } from '../../redux/users/types'
import { useEffect, useRef } from 'react'
import Preloader from '../../components/Common/Preloader/Preloader'

interface UsersProps {
  totalCount: number
  users: IUser[] | []
  pageItemsCount: number
  currentPage: number
  isFollowing: number[]
  isUsersFetching: boolean
  setCurrentPage: (currentPage: number) => void
  userFollow: (id: number, followed: boolean) => void
  userUnFollow: (id: number, followed: boolean) => void
}

const Users: React.FC<UsersProps> = ({isUsersFetching, totalCount, pageItemsCount, currentPage, ...props }) => {
  const pagesCount = Math.ceil(totalCount / pageItemsCount)
  const lastElem = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if(isUsersFetching) return
    if(observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      console.log(currentPage)
      if(entries[0].isIntersecting && currentPage < totalCount) {
        props.setCurrentPage(currentPage + 1)
      }
    })
    // console.log(lastElem.current)
    observer.current.observe(lastElem.current!)
  }, [isUsersFetching])

  const pagesCountArr = []
  for (let i = 1; i <= pagesCount; i++) {
    pagesCountArr.push(i)
  }

  const pageNumbers = pagesCountArr.map((num) => {
    const numberStyle =
      currentPage === num
        ? `${cl.paginationItem} ${cl.active}`
        : cl.paginationItem
    return (
      <div
        key={num}
        onClick={() => {
          props.setCurrentPage(num)
        }}
        className={numberStyle}
      >
        {num}
      </div>
    )
  })

  // if(isUsersFetching) {
  //   return <Preloader/>
  // }
  return (
    <section className={cl.usersSection}>
      <h2 className={cl.title}>Users</h2>
      <div className={cl.pagination}>
        <button
          onClick={() => {
            props.setCurrentPage(currentPage - 1)
          }}
          className={cl.paginationBtn}
        >
          prev
        </button>
        <div className={cl.paginationContainer}>
          <div className={cl.paginationSlider}>{pageNumbers}</div>
        </div>
        <button
          onClick={() => {
            props.setCurrentPage(currentPage + 1)
          }}
          className={cl.paginationBtn}
        >
          next
        </button>
      </div>
      <ul className={cl.usersList}>
        {props.users.map((user) => (
          <User
            key={user.id}
            user={user}
            isFollowing={props.isFollowing}
            userFollow={props.userFollow}
          />
        ))}
      </ul>
      <div ref={lastElem}/>
    </section>
  )
}

export default Users
