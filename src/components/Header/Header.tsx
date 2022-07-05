import cl from './Header.module.scss'
import { Link } from 'react-router-dom'
import LogoApp from '../common/LogoApp/LogoApp'
import React from 'react'
import { AuthenticatedUser } from '../../redux/auth/types'
import AuthenticatedUserButton from './AuthenticatedUserButton/AuthenticatedUserButton'
import { makeFirstLetterUppercase } from '../../helpers/helpers'

interface HeaderProps {
  authUser: AuthenticatedUser | undefined
  deleteAuthenticatedSession: () => void
}

const Header: React.FC<HeaderProps> = ({ authUser, ...props }) => {
  const profileName = authUser && makeFirstLetterUppercase(authUser.login)

  return (
    <header className={cl.header} data-header>
      <Link className={cl.logoContainer} to="login"><LogoApp /></Link>
      {profileName ? (
        <AuthenticatedUserButton
          authUser={authUser}
          deleteAuthenticatedSession={props.deleteAuthenticatedSession}
        />
      ) : (
        <Link className={cl.currentUser} to="login">login</Link>
      )}
    </header>
  )
}

export default Header


