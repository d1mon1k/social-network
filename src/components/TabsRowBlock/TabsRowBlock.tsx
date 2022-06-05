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
  return (
    <div className={cl.tabs}>
      <div className={cl.tabsRow}>
        <div className={`${cl.tabItem} ${cl.active}`}>
          <span>{firstTabName}</span>
          <span className={cl.totalCount}>{totalCount}</span>
        </div>
        <div className={cl.tabItem}>{secondTabName}</div>
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