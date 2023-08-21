import * as React from 'react'
import style from './TaskOptions.module.scss'
import { ReactComponent as UnComplete } from '../../assets/uncomplete.svg'
import { ReactComponent as Complete } from '../../assets/complete.svg'
import { ReactComponent as Save } from '../../assets/save.svg'
import { ReactComponent as Update } from '../../assets/update.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'

type TaskOptionsProps = {
  complete: boolean
  editable: boolean
  saveDataHandler: () => void
  updateTaskHandler: () => void
  removeTaskHandler: () => void
  setEditable: (data: boolean) => void
}
export const TaskOptions = ({
  complete,
  editable,
  updateTaskHandler,
  removeTaskHandler,
  saveDataHandler,
  setEditable,
}: TaskOptionsProps) => {
  return (
    <div className={style.taskOptions}>
      <div className={style.taskOption} onClick={updateTaskHandler}>
        {complete ? <UnComplete className={style.icon} /> : <Complete className={style.icon} />}
      </div>
      <div
        className={style.taskOption}
        onClick={() => {
          !complete && setEditable(!editable)
          editable && saveDataHandler()
        }}
      >
        {editable ? <Save className={style.icon} /> : <Update className={style.icon} />}
      </div>
      <div className={style.taskOption} onClick={removeTaskHandler}>
        <Delete className={style.icon} />
      </div>
    </div>
  )
}
