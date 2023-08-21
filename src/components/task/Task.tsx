import * as React from 'react'
import style from './Task.module.scss'
import { removeTask, updateTask } from '../../store/asyncInstances'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import { useState } from 'react'
import { TaskOptions } from './TaskOptions'

type Props = {
  id: string
  title: string
  text: string
  complete: boolean
  disabled: boolean
}
export const Task = ({ id, text, title, complete, disabled }: Props) => {
  const dispatch = useAppDispatch()
  const [editable, setEditable] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title)
  const [taskText, setTaskText] = useState(text)
  const saveDataHandler = () => {
    dispatch(updateTask({ title: taskTitle, text: taskText, id, complete }))
  }
  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskText(e.currentTarget.value)
  }
  const setEditableHandler = () => {
    !complete && setEditable(true)
  }
  const updateTaskHandler = () => {
    dispatch(updateTask({ title, text, id, complete: !complete }))
  }
  const removeTaskHandler = () => {
    dispatch(removeTask(id))
  }
  return (
    <div
      className={`${style.task} ${complete && style.taskComplete} ${
        disabled && style.taskDisabled
      }`}
    >
      {editable ? (
        <input
          maxLength={38}
          className={`${style.taskTitle} ${style.input}`}
          type="text"
          onChange={changeTitleHandler}
          value={taskTitle}
        />
      ) : (
        <div
          onDoubleClick={() => {
            !complete && setEditable(true)
          }}
          className={style.taskTitle}
        >
          {taskTitle}
        </div>
      )}
      {editable ? (
        <textarea
          autoFocus={true}
          maxLength={200}
          className={`${style.taskText} ${style.textArea} ${style.input}`}
          value={taskText}
          onChange={changeTextHandler}
        />
      ) : (
        <div onDoubleClick={setEditableHandler} className={style.taskText}>
          {taskText}
        </div>
      )}
      <TaskOptions
        updateTaskHandler={updateTaskHandler}
        saveDataHandler={saveDataHandler}
        removeTaskHandler={removeTaskHandler}
        complete={complete}
        editable={editable}
        setEditable={setEditable}
      />
    </div>
  )
}
