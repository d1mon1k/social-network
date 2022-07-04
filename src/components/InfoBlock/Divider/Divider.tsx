import cl from './Divider.module.scss'

/* ------------- Types ------------- */
interface DividerProps {
  dividerName?: string
}

/* ------------- Component ------------- */
export const Divider: React.FC<DividerProps> = ({ dividerName }) => {
  return (
    <div className={cl.dividerBlock}>
      {dividerName && <div className={cl.dividerName}>{dividerName}</div>}
      <div className={cl.divider}></div>
    </div>
  )
}

export default Divider