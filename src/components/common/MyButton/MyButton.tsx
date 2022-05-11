import Preloader from '../Preloader/Preloader'
import cl from './MyButton.module.scss'

interface MyButtonProps {
  callBack: () => void
  disabled?: boolean
}

const MyButton: React.FC<MyButtonProps> = ({ callBack, ...props }) => {
  return (
    <button {...props} className={cl.btn} onClick={callBack}>
      {(props.disabled === true)  
      ? (<Preloader width="100%" height="100%" position="absolute" />) 
      : (props.children)}
    </button>
  )
}

export default MyButton
