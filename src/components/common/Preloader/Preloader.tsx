import preloader from '../../../assets/images/svg/preloader.svg'

interface PreloaderProps {
  width: string
  height: string
  position: 'absolute' | 'fixed'
  margin?: string
}

const Preloader: React.FC<PreloaderProps> = ({margin, width, height, position}) => {
  const preloaderAbsolute = {
    position: position,
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as React.CSSProperties

  const preloaderFixed = {
    width: width,
    height: height,
    position: position,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as React.CSSProperties

  const containerStyles = {
    margin: margin || '0 auto',
    width: width,
    height: height,
    position: 'relative',
  } as React.CSSProperties

  return position === 'fixed' ? (
    <img src={preloader} alt="preloader" style={preloaderFixed} />
  ) : (
    <div style={containerStyles}><img src={preloader} alt="preloader" style={preloaderAbsolute} /></div>
  )
}

export default Preloader
