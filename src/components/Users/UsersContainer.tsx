import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  toggleUserFollow,
  setUsers,
  setTotalCount,
  setCurrentPage,
  toggleIsFetching,
} from '../../redux/reducers/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader'

//? Думаю можно сделать функциональную компоненту с useEffect хуком
class UsersContainerAPI extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching()
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageItemsCount}`
      )
      .then(({ data: { totalCount }, data: { items } }) => {
        this.props.setTotalCount(totalCount)
        this.props.setUsers(items)
        this.props.toggleIsFetching()
      })
  }

  setCurrentPage = (currentPage) => {
    this.props.setCurrentPage(currentPage)
    this.props.toggleIsFetching()
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageItemsCount}`
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

//note В данном файле - UsersContainer у нас содержится две компоненты контейнера. Одна оборачивает Users и предаёт туда результат AJAX запроса (UsersContainerAPI), а вторая оборачивает UsersContainerAPI и передаёт туда через метод connect (r-r library), MSTP & MDTP - т.е. помещает в пропсы state и callback's , которые выполняют dispatch.

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    pageItemsCount: state.usersPage.pageItemsCount,
    isFetching: state.usersPage.isFetching,
  }
}

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

const actionCreators = {
  toggleUserFollow,
  setUsers,
  setTotalCount,
  setCurrentPage,
  toggleIsFetching,
}

const UsersContainer = connect(
  mapStateToProps,
  actionCreators
)(UsersContainerAPI)

export default UsersContainer
