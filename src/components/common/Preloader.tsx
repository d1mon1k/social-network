import preloader from '../../assets/images/preloader.svg'
import cl from './Preloader.module.scss'

const Preloader = () => {
  return <img src={preloader} alt="preloader" className={cl.preloader} />
}

export default Preloader
