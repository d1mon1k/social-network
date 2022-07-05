import { useEffect, useState } from 'react'
import { ArrowSvg } from '../../../helpers/icons/icons'
import { AuthenticatedUser } from '../../../redux/auth/types'
import cl from './AuthenticatedUserButton.module.scss'
import Avatar from '../../Avatar/Avatar'
import HeaderPopup from './UserPopup/UserPopup'
import { makeFirstLetterUppercase } from '../../../helpers/helpers'

/* ------------- Types ------------- */
interface AuthenticatedUserBtn {
  authUser: AuthenticatedUser | undefined
  deleteAuthenticatedSession: () => void
}

/* ------------- Component ------------- */
const AuthenticatedUserButton: React.FC<AuthenticatedUserBtn> = ({authUser, deleteAuthenticatedSession}) => {
  const [isPopUp, setIsPopUp] = useState(false)
  const profileName = makeFirstLetterUppercase(authUser?.login)
  const profilePhoto = authUser?.photos?.small

  const handleOpenPopUp = (e: React.MouseEvent) => {
    (e.target as Element).hasAttribute('data-popup') && setIsPopUp((prev) => !prev)
  }

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-header]')
    header!.style.zIndex = isPopUp ? '15' : 'auto'
  }, [isPopUp])

  return (
    <div onClick={handleOpenPopUp} className={cl.currentUser} data-popup={true}>
      <div className={cl.avatarContainer}>
        <Avatar photo={profilePhoto} />
      </div>
      <ArrowSvg className={cl.arrowSvgBottom} />
      {isPopUp && (
        <HeaderPopup
          profilePhoto={profilePhoto}
          profileName={profileName}
          deleteAuthenticatedSession={deleteAuthenticatedSession}
        />
      )}
    </div>
  )
}

export default AuthenticatedUserButton