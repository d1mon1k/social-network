import React from 'react'
import axios from 'axios'
import { connect, ConnectedProps } from 'react-redux'
import { toggleUserFollow, setUsers, setTotalCount, setCurrentPage, toggleIsFetching } from '../../store/action-creators/users-ac'
import Users from './Users'
import Preloader from '../common/Preloader'
import { RootState } from '../../store/store'

//note В данном файле - UsersContainer у нас содержится две компоненты контейнера. Одна оборачивает Users и предаёт туда результат AJAX запроса (UsersContainerAPI), а вторая оборачивает UsersContainerAPI и передаёт туда через метод connect (r-r library), MSTP & MDTP - т.е. помещает в пропсы state и callback's , которые выполняют dispatch.

class UsersContainerAPI extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.toggleIsFetching()
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageItemsCount}`, { withCredentials: true })
      .then(({ data: { totalCount }, data: { items } }) => {
        this.props.setTotalCount(totalCount)
        this.props.setUsers(items)
        this.props.toggleIsFetching()
      })
  }

  setCurrentPage = (currentPage: number) => {
    this.props.setCurrentPage(currentPage)
    this.props.toggleIsFetching()
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageItemsCount}`, 
        { withCredentials: true }
      )
      .then(({ data: { totalCount }, data: { items } }) => {
        this.props.setTotalCount(totalCount)
        this.props.setUsers(items)
        this.props.toggleIsFetching()
      })
  }

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalCount={this.props.totalCount}
            pageItemsCount={this.props.pageItemsCount}
            currentPage={this.props.currentPage}
            setCurrentPage={this.setCurrentPage}
            users={this.props.users}
            toggleUserFollow={this.props.toggleUserFollow}
          />
        )}
      </>
    )
  }
}

//============================== Container component ==============================
const mapStateToProps = (state: RootState) => {
  return {
    users: state.usersPage.users,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    pageItemsCount: state.usersPage.pageItemsCount,
    isFetching: state.usersPage.isFetching,
  }
}

const actionCreators = {
  toggleUserFollow,
  setUsers,
  setTotalCount,
  setCurrentPage,
  toggleIsFetching,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>
const UsersContainer = connector(UsersContainerAPI)

export default UsersContainer

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleFollow(userId) {
//       dispatch(toggleUserFollowAC(userId))
//     },
//     setUsers(users) {
//       dispatch(setUsersAC(users))
//     },
//     setItemsTotalCount(totalCount) {
//       dispatch(setTotalCountAC(totalCount))
//     },
//     setCurrentPage(currentPage) {
//       dispatch(setCurrentPageAC(currentPage))
//     },
//     toggleIsFetching() {
//       dispatch(toggleIsFetchingAC())
//     },
//   }
// }


