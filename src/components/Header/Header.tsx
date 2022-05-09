import cl from './Header.module.scss'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import { ArrowSvg } from '../../helpers/icons/icons'
import { UserProfile } from '../../redux/profile/types'
import LogoApp from '../Common/LogoApp/LogoApp'
import React, { useState } from 'react'

interface HeaderProps {
  profile: UserProfile | undefined
  deleteAuthenticatedSession: () => void
}

const Header: React.FC<HeaderProps> = ({ profile, ...props }) => {
  const [popup, setPopup] = useState(true)
  const profileName = profile && profile.fullName
  const profilePhoto = profile && profile.photos.small

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
        <Link to="login">login</Link>
      )}
    </header>
  )
}

export default Header
