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

const InitialState: TasksType = {
  ['todolistId1']:
    [{id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false}
    ],
  ['todolistId2']:
    [{id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Meat", isDone: true},
      {id: v1(), title: "Fish", isDone: false}
    ]
}
export const tasksReducer = (state: TasksType = InitialState, action: ActionsType) => {
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
      return state
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