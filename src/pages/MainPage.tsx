import * as React from 'react'
import style from './MainPage.module.scss'
import { Task } from '../components/task/Task'
import { useAppSelector } from '../utils/hooks/redux-hooks'

export const MainPage = () => {
  const tasks = useAppSelector((state) => state.todos.tasks)
  const status = useAppSelector((state) => state.todos.status)
  return (
    <div className={style.mainPage}>
      {tasks &&
        tasks.map((task) => (
          <Task
            disabled={status === 'loading'}
            key={task.id}
            id={task.id}
            complete={task.complete}
            title={task.title}
            text={task.text}
          />
        ))}
    </div>
  )
}
