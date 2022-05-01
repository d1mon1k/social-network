import cl from './Users.module.scss'
import { User } from './User/User'
import { IUser } from '../../redux/users/types'

interface Props {
  totalCount: number
  users: IUser[] | undefined
  pageItemsCount: number
  currentPage: number
  isFollowing: number[]
  setCurrentPage: (currentPage: number) => void
  userFollow: (id: number, followed: boolean) => void
  userUnFollow: (id: number, followed: boolean) => void
}

const Users: React.FC<Props> = (props) => {
  const pagesCount = Math.ceil(props.totalCount / props.pageItemsCount)

  const pagesCountArr = []
  for (let i = 1; i <= pagesCount; i++) {
    pagesCountArr.push(i)
  }

  const pageNumbers = pagesCountArr.map((num) => {
    const numberStyle =
      props.currentPage === num
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

  return (
    <section className={cl.usersSection}>
      <h2 className={cl.title}>Users</h2>
      <div className={cl.pagination}>
        <button
          onClick={() => {
            props.setCurrentPage(props.currentPage - 1)
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
            props.setCurrentPage(props.currentPage + 1)
          }}
          className={cl.paginationBtn}
        >
          next
        </button>
      </div>
      <ul className={cl.usersList}>
        {props.users && props.users.map((user) => (
          <User
            key={user.id}
            user={user}
            isFollowing={props.isFollowing}
            userFollow={props.userFollow}
          />
        ))}
      </ul>
    </section>
  )
}

export default Users
