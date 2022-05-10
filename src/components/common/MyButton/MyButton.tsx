import Preloader from '../Preloader/Preloader'
import cl from './MyButton.module.scss'

interface Props {
  callBack: () => void
  disabled?: boolean
}

export const MyButton: React.FC<Props> = ({ callBack, ...props }) => {
  return (
    <button {...props} className={cl.btn} onClick={callBack}>
      {(props.disabled === true)  
      ? (<Preloader width="100%" height="100%" position="absolute" />) 
      : (props.children)}
    </button>
  )
}
