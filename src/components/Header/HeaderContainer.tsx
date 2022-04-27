import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { fetchingErrorAC, setCurrentUserAC, getAuthUser } from '../../redux/action-creators/auth-ac'
import { RootState } from '../../redux/store'
import { authLogout } from '../../redux/action-creators/auth-ac'
import Header from './Header'

class HeaderContainerApi extends React.Component<PropsFromRedux> {
  // componentDidMount() {
  //   this.props.getAuthUser()
  // }

  render() {
    return <Header authLogout={this.props.authLogout} login={this.props.data.login || null} />
  }
}

const mapStateToProps = (state: RootState) => {
  return { ...state.auth }
}

const actionCreators = {
  fetchingErrorAC,
  setCurrentUserAC,
  getAuthUser,
  authLogout
}

const connector = connect(mapStateToProps, actionCreators)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<any>(connector)(HeaderContainerApi) 