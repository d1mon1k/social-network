export const ArrowSvg = () => {
  return (
    <svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  )
}

interface LogoSvgProps {
  className: string
}
export const LogoSvg: React.FC<LogoSvgProps> = (props) => {
  return (
    <svg {...props} width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5.5L9.93198 5.43198C9.33524 4.83524 8.52589 4.5 7.68198 4.5H7.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5H7.68198C8.52589 10.5 9.33524 10.1648 9.93198 9.56802L10 9.5M1.5 10.5V4.5L7.5 1L13.5 4.5V10.5L7.5 14L1.5 10.5Z" stroke="black"/>
    </svg>
  )
}

