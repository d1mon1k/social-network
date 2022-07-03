import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { isActiveNavLink } from '../../helpers/helpers'
import MyButton from '../common/MyButton/MyButton'
import cl from './TabsRowBlock.module.scss'

interface TabsRowBlockProps {
  totalCount?: number
  firstTabName: string
  secondTabName: string
  callBack?: () => void
}

const TabsRowBlock: React.FC<TabsRowBlockProps> = ({ 
  totalCount,
  callBack,
  firstTabName,
  secondTabName 
}) => {
  const location = useLocation()
  const isPeople = location.pathname === '/users/all-people'

  return (
    <div className={cl.tabs}>
      <div className={cl.tabsRow}>
      <NavLink to="/users/all-people" end className={isActiveNavLink(cl.tabItem, cl.active)} >
        <span>{firstTabName}</span>
        {isPeople && <span className={cl.totalCount}>{totalCount}</span>}
      </NavLink>
      <NavLink to="/users" end className={isActiveNavLink(cl.tabItem, cl.active)} >
        <span>{secondTabName}</span>
        {!isPeople && <span className={cl.totalCount}>{totalCount}</span>}
      </NavLink>
      </div>
      {callBack && (
        <div className={cl.buttonContainer}>
          <MyButton callBack={callBack}>Find developers</MyButton>
        </div>
      )}
    </div>
  )
}




export default TabsRowBlock