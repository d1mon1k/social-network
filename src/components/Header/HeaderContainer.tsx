import axios from 'axios'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { toggleIsFetchingAC, fetchingErrorAC, setCurrentUserAC } from '../../store/action-creators/auth-ac'
import { RootState } from '../../store/store'
import Preloader from '../common/Preloader'
import Header from './Header'

class HeaderContainerApi extends React.Component<PropsFromRedux> {
  componentDidMount() {
    ;(async () => {
      try{
        this.props.toggleIsFetchingAC()
        const response = await axios.get( 'https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
        if(response.data.resultCode === 0) {
          this.props.setCurrentUserAC(response.data)
        }
      }catch(e) {
        this.props.fetchingErrorAC('Не удалось войти в учётную запись')
      }
    })()
  }

  render() {
    if(this.props.isFetching) {
      return <Preloader/>
    }

    return <Header login={this.props.data.login || 'login'} />
  }
}

const mapStateToProps = (state: RootState) => {
  return { ...state.auth }
}

const actionCreators = {
  toggleIsFetchingAC,
  fetchingErrorAC,
  setCurrentUserAC
}

const connector = connect(mapStateToProps, actionCreators)
type PropsFromRedux = ConnectedProps<typeof connector>
export const HeaderContainer = connector(HeaderContainerApi)