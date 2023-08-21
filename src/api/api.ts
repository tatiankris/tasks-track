import { instance } from './instance'
import { TaskType } from '../store/tasksSlice'

export const tasksAPI = {
  async serverConnected() {
    const response = await instance.get(``)
    return response.data
  },
  async getTasks() {
    const response = await instance.get(`/tasks`)
    return response.data
  },
  async addTask(task: TaskType) {
    const response = await instance.post(`/tasks/task`, task)
    return response.data
  },
  async updateTask(task: TaskType) {
    const response = await instance.put(`/tasks/task`, task)
    return response.data
  },
  async deleteTask(id: string) {
    const response = await instance.delete(`/tasks/task/${id}`)
    return response.data
  },
}
