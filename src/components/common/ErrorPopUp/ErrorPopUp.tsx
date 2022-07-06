import { useEffect, useRef, useState } from 'react'
import cl from './ErrorPopUp.module.scss'

/* ------------- Types ------------- */
interface ErrorPopUpProps {
  titlesArray: Array<(string | null)>
}

/* ------------- Component ------------- */
const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ titlesArray }) => (
  <>
    {titlesArray
      .filter((e) => e !== null)
      .map((title, index) => (
        <Error key={index} title={title!} />
      ))}
  </>
)

export default ErrorPopUp

/* ------------- Nested Components ------------- */
const Error = ({ title }: {title: string }) => {
  const errorRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  let animationDuration = useRef<number>()
  
  useEffect(() => {
    if(errorRef.current) {
      animationDuration.current = parseInt(window.getComputedStyle(errorRef.current).animationDuration) * 1000
    }
  }, [errorRef])

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, animationDuration.current)
  })

  return (
    <>{isVisible && <div ref={errorRef} className={cl.errorWrapper}>{title}</div>}</>
  )
}