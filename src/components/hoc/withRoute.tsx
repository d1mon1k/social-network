import { useMatch, useNavigate, useLocation, useParams } from 'react-router-dom';

export const withRoute = (Component: any) => {
  return (props: any) => {
    let match = useMatch(':userId')
    let navigate = useNavigate()
    let location = useLocation()
    let params = useParams()
    return <Component {...props} route={{ match, navigate, location, params }} />
  }
}

export type RouteType = {
  route: {
    match: boolean
    location: {
      hash: string
      key: string
      pathname: string
      search: string
    }
    navigate: (link: string) => void
    params: { userId: string }
  }
} 