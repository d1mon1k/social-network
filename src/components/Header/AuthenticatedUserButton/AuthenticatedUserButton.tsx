import { useState } from 'react'
import { ArrowSvg } from '../../../helpers/icons/icons'
import { AuthenticatedUser } from '../../../redux/auth/types'
import cl from './AuthenticatedUserButton.module.scss'
import Avatar from '../../Avatar/Avatar'
import HeaderPopup from './HeaderPopup/HeaderPopup'
import { makeFirstLetterUppercase } from '../../../helpers/helpers'

interface AuthenticatedUserBtn {
  authUser: AuthenticatedUser | undefined
  deleteAuthenticatedSession: () => void
}

const AuthenticatedUserButton: React.FC<AuthenticatedUserBtn> = ({authUser, ...props}) => {
  const [popup, setPopup] = useState(false)
  const profileName = authUser && makeFirstLetterUppercase(authUser.login)
  const profilePhoto = authUser && authUser.photos && authUser.photos.small

  const popupHandler = (e: React.MouseEvent) => {
    (e.target as Element).hasAttribute('data-popup') && setPopup((prev) => !prev)
  }

  return (
    <div onClick={popupHandler} className={cl.currentUser} data-popup={true}> 
      <div className={cl.avatarContainer}><Avatar photo={profilePhoto} /></div>
      <ArrowSvg className={cl.arrowSvgBottom} />
      {popup && (
        <HeaderPopup
          profilePhoto={profilePhoto}
          profileName={profileName}
          popupHandler={popupHandler}
          deleteAuthenticatedSession={props.deleteAuthenticatedSession}
        />
      )}
    </div>
  )
}

export default AuthenticatedUserButton