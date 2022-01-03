import React from 'react'
import preloader from './../../assets/imgs/preloader.svg'
import cl from './Preloader.module.css'

const Preloader = () => {
  return <img src={preloader} className={cl.preloader} />
}

export default Preloader
