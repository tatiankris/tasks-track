import { UpcomingOperation, UpcomingOperationRemove } from '../store/tasksSlice'
import { tasksAPI } from '../api/api'

export const updateServer = async function (
  operations: Array<UpcomingOperation | UpcomingOperationRemove>
) {
  for (const el of operations) {
    if (el.name === 'add') {
      await tasksAPI.addTask(el.task)
    }
    if (el.name === 'update') {
      await tasksAPI.updateTask(el.task)
    }
    if (el.name === 'remove') {
      await tasksAPI.deleteTask(el.id)
    }
  }
  return
}
