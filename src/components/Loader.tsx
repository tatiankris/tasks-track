import * as React from 'react'
import loader from '../assets/spinner.gif'
import style from './Loader.module.scss'

export const Loader = () => {
  return <img className={style.loader} src={loader} />
}
