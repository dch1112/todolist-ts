import {TasksType} from "../App";
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

const InitialState: TasksType = {}

export const tasksReducer = (state: TasksType = InitialState, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      const tasks = state[action.todolistId].filter((task) => task.id !== action.taskId)
      return {...state, [action.todolistId]: tasks}
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
    case 'CHANGE-TASK-STATUS': {

      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
          ...task,
          isDone: action.isDone
        } : task)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
          ...task,
          title: action.title
        } : task)
      }
    }
    case 'ADD-TODOLIST':
      return {[action.todolistId]: [], ...state}
    case 'REMOVE-TODOLIST': {
      let copyState = {...state}
      delete copyState[action.todolistId]
      return copyState
    }

    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({
  type: 'REMOVE-TASK',
  taskId: taskId,
  todolistId: todolistId
})

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({
  type: 'ADD-TASK',
  title: title,
  todolistId: todolistId
})

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => ({
  type: 'CHANGE-TASK-STATUS',
  taskId: taskId,
  isDone: isDone,
  todolistId: todolistId
})

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => ({
  type: 'CHANGE-TASK-TITLE',
  taskId: taskId,
  title: title,
  todolistId: todolistId
})