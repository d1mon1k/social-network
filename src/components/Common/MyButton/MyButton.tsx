import cl from './MyButton.module.scss'

interface Props {
  callBack: () => void
}

export const MyButton: React.FC<Props> = (props) => {
  return (
    <button
      className={cl.btn}
      onClick={props.callBack}
    >
      {props.children}
    </button>
  )
}