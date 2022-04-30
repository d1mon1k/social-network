import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/store'
import { deleteAuthenticatedSessionThunk } from '../../redux/auth/thunks'
import Header from './Header'

class HeaderContainerApi extends React.Component<PropsFromRedux> {
  // componentDidMount() {
  //   this.props.getAuthUser()
  // }

  render() {
    return <Header deleteAuthenticatedSession={this.props.deleteAuthenticatedSessionThunk} login={(this.props.user && this.props.user.data.login) || null} />
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.user
  }
}

const actionCreators = {
  deleteAuthenticatedSessionThunk
}

const connector = connect(mapStateToProps, actionCreators)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<any>(connector)(HeaderContainerApi) 