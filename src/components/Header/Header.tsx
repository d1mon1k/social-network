import cl from './Header.module.scss'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import { ArrowSvg } from '../../helpers/icons/icons'
import { UserProfile } from '../../redux/profile/types'
import LogoApp from '../Common/LogoApp/LogoApp'
import React, { useState } from 'react'
import { AuthenticatedUser } from '../../redux/auth/types'

interface HeaderProps {
  profile: UserProfile | undefined
  authUser: AuthenticatedUser | undefined
  deleteAuthenticatedSession: () => void
}

const Header: React.FC<HeaderProps> = ({ profile, authUser, ...props }) => {
  const [popup, setPopup] = useState(false)
  const profileName = profile && authUser && profile.fullName
  const profilePhoto = profile && authUser && profile.photos.small

  const popupHandler = (e: React.MouseEvent) => {
    if((e.target as Element).className === cl.popup) return
    setPopup((prev) => !prev)
  }

  return (
    <header className={cl.header}>
      <Link className={cl.logoContainer} to="login">
        <LogoApp />
      </Link>
      {profileName ? (
        <div onClick={popupHandler} className={cl.currentUser}>
          <Avatar photo={profilePhoto} />
          <ArrowSvg />
          {popup && (
            <>
              <div className={cl.popupContainer}></div>
              <div className={cl.popup}>
                <span>{profileName}</span>
                <button onClick={props.deleteAuthenticatedSession}>Log out</button>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link className={cl.currentUser} to="login">login</Link>
      )}
    </header>
  )
}

export default Header
