import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { changeCurrentPage, getUsers, setCurrentPage, userFollow, userUnFollow } from '../../redux/action-creators/users-ac'
import Users from './Users'
import Preloader from '../../components/Common/Preloader/Preloader'
import { RootState } from '../../redux/store' 
import { compose } from 'redux'
import { currentPageSelector, isFetchingSelector, isFollowingSelector, pageItemsCountSelector, totalCountSelector, usersSelector } from '../../redux/selectors/users-selector'

//note В данном файле - UsersContainer у нас содержится две компоненты контейнера. Одна оборачивает Users и предаёт туда результат AJAX запроса (UsersContainerAPI), а вторая оборачивает UsersContainerAPI и передаёт туда через метод connect (r-r library), MSTP & MDTP - т.е. помещает в пропсы state и callback's , которые выполняют dispatch.

class UsersContainerAPI extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.getUsers()
  }

  setCurrentPage = (currentPage: number) => {
    this.props.changeCurrentPage(currentPage)
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
            isFollowing={this.props.isFollowing}
            userFollow={this.props.userFollow}
            userUnFollow={this.props.userUnFollow}
          />
        )}
      </>
    )
  }
}

//============================== Container component ==============================
const mapStateToProps = (state: RootState) => {
  return {
    users: usersSelector(state),
    totalCount: totalCountSelector(state),
    currentPage: currentPageSelector(state),
    pageItemsCount: pageItemsCountSelector(state),
    isFetching: isFetchingSelector(state),
    isFollowing: isFollowingSelector(state),
  }
}

const actionCreators = {
  setCurrentPage,
  getUsers,
  changeCurrentPage,
  userUnFollow,
  userFollow,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<any>(
  connector,
)(UsersContainerAPI)




