import {
  ArrowSvg,
  HelpSvg,
  ModeSvg,
  SignOutSvg,
} from '../../../../helpers/icons/icons'
import Avatar from '../../../Avatar/Avatar'
import NavItemSvg from '../../../common/NavItemSvg/NavItemSvg'
import cl from './HeaderPopup.module.scss'

interface HeaderPopupProps {
  profilePhoto: string | null | undefined
  profileName: string | undefined
  popupHandler: (e: React.MouseEvent) => void
  deleteAuthenticatedSession: () => void
}

const HeaderPopup: React.FC<HeaderPopupProps> = ({ profileName, profilePhoto, popupHandler, ...props }) => {
  return (
    <>
      <div className={cl.popupContainer} data-popup={true}></div>
      <div className={cl.popup}>
        <div className={cl.userInfoRow}>
          <Avatar photo={profilePhoto} />
          <div className={cl.addInfoCol}>
            <span className={cl.profileName}>{profileName}</span>
            <span className={cl.phoneNumber}>+375 29 *** ** 92</span>
          </div>
          <ArrowSvg className={cl.arrowSvgRight} />
        </div>
        <NavItemSvg textItem='Help' ComponentSvg={HelpSvg}/>
        <NavItemSvg textItem='Mode: dark' ComponentSvg={ModeSvg}/>
        <NavItemSvg onClick={props.deleteAuthenticatedSession} textItem='Sign out' ComponentSvg={SignOutSvg}/>
      </div>
    </>
  )
}

export default HeaderPopup
