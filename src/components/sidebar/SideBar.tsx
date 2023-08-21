import * as React from 'react'
import style from './SideBar.module.scss'
import { ReactComponent as Add } from '../../assets/add.svg'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import { addTask } from '../../store/asyncInstances'

export const SideBar = () => {
  const dispatch = useAppDispatch()
  return (
    <div className={style.sideBar}>
      <div className={style.iconBox}>
        <Add onClick={() => dispatch(addTask())} className={style.addIcon} />
      </div>
    </div>
  )
}
