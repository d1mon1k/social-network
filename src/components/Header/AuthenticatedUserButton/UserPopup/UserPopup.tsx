import {
  ArrowSvg,
  HelpSvg,
  ModeSvg,
  SignOutSvg,
} from '../../../../helpers/icons/icons'
import Avatar from '../../../Avatar/Avatar'
import NavItemSvg from '../../../common/NavItemSvg/NavItemSvg'
import cl from './UserPopup.module.scss'

/* ------------- Types ------------- */
interface HeaderPopupProps {
  profilePhoto: string | null | undefined
  profileName: string | undefined
  deleteAuthenticatedSession: () => void
}

/* ------------- Component ------------- */
const HeaderPopup: React.FC<HeaderPopupProps> = ({
  profileName,
  profilePhoto,
  deleteAuthenticatedSession,
}) => {
  return (
    <>
      <div className={cl.popupContainer} data-popup={true}></div>
      <div className={cl.popup}>
        <div className={cl.userInfoRow}>
          <div className={cl.avatarContainer}>
            <Avatar photo={profilePhoto} />
          </div>
          <div className={cl.addInfoCol}>
            <span className={cl.profileName}>{profileName}</span>
            <span className={cl.phoneNumber}>+375 29 *** ** 92</span>
          </div>
          <ArrowSvg className={cl.arrowSvgRight} />
        </div>
        <NavItemSvg textItem="Help" ComponentSvg={HelpSvg} />
        <NavItemSvg textItem="Mode: dark" ComponentSvg={ModeSvg} />
        <NavItemSvg
          onClick={deleteAuthenticatedSession}
          textItem="Sign out"
          ComponentSvg={SignOutSvg}
        />
      </div>
    </>
  )
}

export default HeaderPopup
