import preloader from '../../../assets/images/svg/preloader.svg'
import cl from './Preloader.module.scss'

const Preloader = () => {
  return <img src={preloader} alt="preloader" className={cl.preloader} />
}

export default Preloader
