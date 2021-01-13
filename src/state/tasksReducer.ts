import {TasksType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string,
  isDone: boolean,
  todolistId: string
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  title: string
  todolistId: string
}

export type ActionsType = RemoveTaskActionType |
  AddTaskActionType |
  ChangeTaskStatusActionType |
  ChangeTaskTitleActionType |
  AddTodolistActionType |
  RemoveTodolistActionType

export const tasksReducer = (state: TasksType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      const tasks = state[action.todolistId].filter((task) => task.id !== action.taskId)
      return {...state, [action.todolistId]: tasks}
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
    case 'CHANGE-TASK-STATUS':
      const task = state[action.todolistId].find((task) => task.id === action.taskId)
      if (task) {
        task.isDone = action.isDone
      }
      return {...state}
    case 'CHANGE-TASK-TITLE': {
      const task = state[action.todolistId].find((task) => task.id === action.taskId)
      if (task) {
        task.title = action.title
      }
      return {...state}
    }
    case 'ADD-TODOLIST':
      return {[action.todolistId]: [], ...state}
    case 'REMOVE-TODOLIST': {
      let copyState = {...state}
      delete copyState[action.todolistId]
      return copyState
    }

    default:
      throw new Error('Error')
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({
  type: 'REMOVE-TASK' as const,
  taskId: taskId,
  todolistId: todolistId
})

export const addTaskAC = (title: string, todolistId: string) => ({
  type: 'ADD-TASK' as const,
  title: title,
  todolistId: todolistId
})

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
  type: 'CHANGE-TASK-STATUS' as const,
  taskId: taskId,
  isDone: isDone,
  todolistId: todolistId
})

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
  type: 'CHANGE-TASK-TITLE' as const,
  taskId: taskId,
  title: title,
  todolistId: todolistId
})