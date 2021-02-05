import axios from "axios";

const settings = {

  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '7227d9f4-40b2-435d-852d-029544fc42e7'
  }
}

const axiosInstance = axios.create({
  ...settings
})

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>,
  data: D
}

export const todolistAPI = {
  getTodolists() {
    return axiosInstance.get<Array<TodolistType>>(`todo-lists`)
  },
  createTodolist(title: string) {
    return axiosInstance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
  },
  deleteTodolist(todolistID: string) {
    return axiosInstance.delete<ResponseType>(`todo-lists/${todolistID}`)
  },
  updateTodolist(todolistID: string, title: string) {
    return axiosInstance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
  }
}