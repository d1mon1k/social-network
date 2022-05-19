import cl from './ErrorPopUp.module.scss'

interface ErrorPopUpProps {
  titlesArray: Array<(string | null)>
}

export const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ titlesArray }) => {
  return (
    <>
      {titlesArray.map((title, index) => {
        if(title) {
         return <div key={index} className={cl.errorWrapper}>{title}</div>
        }
      })}
    </>
  )
}