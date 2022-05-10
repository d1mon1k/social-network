import cl from './NavItemSvg.module.scss'

interface NavItemSvgProps {
  onClick?: () => void
  ComponentSvg: (props: {className?: string}) => JSX.Element
  textItem?: string
}

const NavItemSvg: React.FC<NavItemSvgProps> = ({ComponentSvg, textItem, ...props}) => {
  return (
    <div {...props} className={cl.menuItem} >
      <ComponentSvg className={cl.svg}/>
      {textItem && <span>{textItem}</span>}
    </div>
  )
}

export default NavItemSvg