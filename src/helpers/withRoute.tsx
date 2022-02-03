import { useMatch, useNavigate, useLocation, useParams } from 'react-router-dom';
import React from 'react';

export const withRoute = (Component: typeof React.Component) => {
  return (props: any) => {
    let match = useMatch(':userId')
    let navigate = useNavigate()
    let location = useLocation()
    let params = useParams()
    return <Component {...props} route={{ match, navigate, location, params }} />
  }
}

export type RouteType = {
  route: { match: boolean; location: {}; navigate: () => void; params: {userId: string} }
} 