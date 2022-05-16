import cl from './ErrorPopUp.module.scss'

interface ErrorPopUpProps {
  title: string
}

export const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ title }) => {
  return (
    <div className={cl.errorWrapper}>
      {title}
    </div>
  )
}