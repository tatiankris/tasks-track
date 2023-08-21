import { createSlice } from '@reduxjs/toolkit'
import { fetchTasks, addTask, updateTask, removeTask } from './asyncInstances'

export type TaskType = {
  id: string
  title: string
  text: string
  complete: boolean
}
export type UpcomingOperation = {
  name: 'add' | 'update'
  task: TaskType
}
export type UpcomingOperationRemove = {
  name: 'remove'
  id: string
}

export type InitialStateType = {
  serverConnected: boolean
  tasks: Array<TaskType>
  status: null | 'loading' | 'completed' | 'error'
  error: null | string
  upcomingOperations: Array<UpcomingOperation | UpcomingOperationRemove>
}
const initialState: InitialStateType = {
  serverConnected: false,
  tasks: [],
  status: null,
  error: null,
  upcomingOperations: [],
} as InitialStateType

const todoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearUpcomingOperations(state) {
      console.log('cleared')
      state.upcomingOperations = []
    },
    setServerConnected(state, action) {
      console.log('cleared')
      state.serverConnected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'completed'
      state.error = null
      state.tasks = action.payload.tasks
    })
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = 'error'
      state.error = 'action.payload.message'
      console.log('fetchTasks.rejected')
    })
    builder.addCase(addTask.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.status = 'completed'
      state.error = null
      action.payload && state.tasks.push(action.payload.task)
    })
    builder.addCase(addTask.rejected, (state, action) => {
      state.status = 'error'
      state.error = 'action.payload.message'
      console.log('actionPayload', action.payload)
      if (action.payload) {
        console.log('upcomingOperations', state.tasks)
        state.upcomingOperations.push({ name: 'add', task: action.payload.task })
        action.payload && state.tasks.push(action.payload.task)
      }
      // console.log('action.payload/add', action.payload && action.payload.task)
    })
    builder.addCase(updateTask.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.status = 'completed'
      state.error = null
      if (action.payload) {
        const resTask = action.payload.task
        if (resTask) {
          const toggledTodo = state.tasks.find((task) => task.id === resTask.id)
          if (toggledTodo) {
            toggledTodo.title = resTask.title
            toggledTodo.text = resTask.text
            toggledTodo.complete = resTask.complete
          }
        }
      }
    })
    builder.addCase(updateTask.rejected, (state, action) => {
      state.status = 'error'
      state.error = 'action.payload.message'
      if (action.payload) {
        state.upcomingOperations.push({ name: 'update', task: action.payload.task })
        const resTask = action.payload.task
        if (resTask) {
          const toggledTodo = state.tasks.find((task) => task.id === resTask.id)
          if (toggledTodo) {
            toggledTodo.title = resTask.title
            toggledTodo.text = resTask.text
            toggledTodo.complete = resTask.complete
          }
        }
      }
    })
    builder.addCase(removeTask.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.status = 'completed'
      state.error = null
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
    })
    builder.addCase(removeTask.rejected, (state, action) => {
      state.status = 'error'
      state.error = 'action.payload.message'
      if (action.payload) {
        state.upcomingOperations.push({ name: 'remove', id: action.payload.id })
        state.tasks = state.tasks.filter((task) => task.id !== action.payload?.id)
      }
    })
  },
})

export const { clearUpcomingOperations, setServerConnected } = todoSlice.actions

export default todoSlice.reducer
