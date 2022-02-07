import cl from './MyButton.module.scss'

interface Props {
  callBack: () => void
  disabled?: boolean
}

export const MyButton: React.FC<Props> = ({callBack, ...props}) => {
  return (
    <button
      { ...props }
      className={cl.btn}
      onClick={callBack}
    >
      {props.children}
    </button>
  )
}