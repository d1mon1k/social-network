import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.user?.login
  }
}

const withAuthenticatedRedirect = (Component: any) => {
  const withAuthenticatedRedirectComponent = (props: PropsFromRedux) =>  {
    if(!props.isAuth) {
      return <Navigate to='/login'/>
    }
    return <Component {...props} />
  }

  const connector = connect(mapStateToProps)
  type PropsFromRedux = ConnectedProps<typeof connector>
  const ConnectedAuthenticatedRedirectComponent = connector(withAuthenticatedRedirectComponent)

  return ConnectedAuthenticatedRedirectComponent
}

export default withAuthenticatedRedirect


