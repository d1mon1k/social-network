import { LogoSvg } from '../../../helpers/icons/icons'
import cl from './LogoApp.module.scss'

const LogoApp = () => {
  return (
      <div className={cl.logo}>
        <div>dev</div>
        <LogoSvg className={cl.svg} />
        <div>lub</div>
      </div>
  )
}

export default LogoApp