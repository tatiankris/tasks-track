import { createAsyncThunk } from '@reduxjs/toolkit'
import { tasksAPI } from '../api/api'
import {
  clearUpcomingOperations,
  InitialStateType,
  setServerConnected,
  TaskType,
} from './tasksSlice'
import { updateServer } from '../utils/utils'

export const fetchTasks = createAsyncThunk<{ tasks: Array<TaskType> }, void>(
  'tasks/fetchTasks',
  async function (_, { getState, dispatch }) {
    try {
      await tasksAPI.serverConnected()
      dispatch(setServerConnected(true))
    } catch (e) {
      dispatch(setServerConnected(false))
    }
    const { todos } = getState() as { todos: InitialStateType }
    if (todos.upcomingOperations.length > 0) {
      await updateServer(todos.upcomingOperations)
      dispatch(clearUpcomingOperations())
    }
    return await tasksAPI.getTasks()
  }
)

export const addTask = createAsyncThunk<
  { task: TaskType },
  void,
  { rejectValue: { task: TaskType } }
>('tasks/addTask', async function (_, { rejectWithValue, getState }) {
  const { state } = getState() as { state: InitialStateType }
  try {
    if (!state.serverConnected) throw 'no connection'
    const response = await tasksAPI.addTask({
      id: new Date().toISOString(),
      title: 'New task',
      text: 'Add some text...',
      complete: false,
    })
    return response as { task: TaskType }
  } catch (e) {
    return rejectWithValue({
      task: {
        id: new Date().toISOString(),
        title: 'New task',
        text: 'Add some text...',
        complete: false,
      },
    } as { task: TaskType })
  }
})
export const updateTask = createAsyncThunk<
  { task: TaskType },
  TaskType,
  { rejectValue: { task: TaskType } }
>('tasks/updateTask', async function (task: TaskType, { rejectWithValue, getState }) {
  const { state } = getState() as { state: InitialStateType }
  try {
    if (!state.serverConnected) throw 'no connection'
    const response = await tasksAPI.updateTask(task)
    return response as { task: TaskType }
  } catch (e) {
    return rejectWithValue({ task: task } as { task: TaskType })
  }
})
export const removeTask = createAsyncThunk<{ id: string }, string, { rejectValue: { id: string } }>(
  'tasks/removeTask',
  async function (id: string, { rejectWithValue, getState }) {
    const { state } = getState() as { state: InitialStateType }
    try {
      if (!state.serverConnected) throw 'no connection'
      const response = await tasksAPI.deleteTask(id)
      return response as { id: string }
    } catch (e) {
      return rejectWithValue({ id: id } as { id: string })
    }
  }
)
