import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store/store'

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export const withAuthRedirect = (Component: any) => {
  const withAuthRedirectComponent = (props: PropsFromRedux) =>  {
    if(!props.isAuth) {
      return <Navigate to='/login'/>
    }
    return <Component {...props} />
  }

  const connector = connect(mapStateToProps)
  type PropsFromRedux = ConnectedProps<typeof connector>
  const ConnectedAuthRedirectComponent = connector(withAuthRedirectComponent)

  return ConnectedAuthRedirectComponent
}



