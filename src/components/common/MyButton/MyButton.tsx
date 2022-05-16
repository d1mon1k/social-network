import Preloader from '../Preloader/Preloader'
import cl from './MyButton.module.scss'

interface MyButtonProps {
  callBack: (arg1?: any, arg2?: any) => void
  disabled?: boolean
  className?: string
  form?: string
}

const MyButton: React.FC<MyButtonProps> = ({className, callBack, ...props }) => {
  return (
    <button {...props} className={`${cl.btn} ${className}`} onClick={callBack}>
      {(props.disabled === true)  
      ? (<Preloader width="100%" height="100%" position="absolute" />) 
      : (props.children)}
    </button>
  )
}

export default MyButton
