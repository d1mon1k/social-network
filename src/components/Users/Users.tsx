import cl from './Users.module.scss'
import photo from '../../assets/images/no-photo.jpg'

interface Props {
  totalCount: number,
  users: {id: number, name: string, status: string, photos: {small: string, big: string}, followed: boolean}[],
  pageItemsCount: number,
  currentPage: number,
  setCurrentPage: (currentPage: number) => void ,
  toggleUserFollow: (userId: number) => void
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
    <>
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
          {props.users.map((user) => {
            return (
              <li className={cl.userItem} key={user.id}>
                <a className={cl.userPhotoWrap} href="/">
                  <img
                    className={cl.userPhoto}
                    src={user.photos.small || photo}
                    alt=""
                  />
                </a>
                <div className={cl.infoColumn}>
                  <a href="/">
                    <span className={cl.userName}>{user.name}</span>
                  </a>
                  <span className={cl.userLocation}>{`Minsk Belarus`}</span>
                </div>
                <button
                  className={cl.followButton}
                  onClick={() => props.toggleUserFollow(user.id)}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default Users
