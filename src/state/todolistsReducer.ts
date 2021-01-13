import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  todolistId: string
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  todolistId: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  todolistId: string
  filter: FilterValueType
}

export type ActionsType = RemoveTodolistActionType |
  AddTodolistActionType |
  ChangeTodolistTitleActionType |
  ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id != action.todolistId)
    case 'ADD-TODOLIST':
      const newTodolist: TodolistType =
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all'
        }
      return [...state, newTodolist]
    case 'CHANGE-TODOLIST-TITLE':
      const todolist = state.find(todolist => todolist.id === action.todolistId)
      if (todolist) {
        todolist.title = action.title
        return [...state]
      }
      return state
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(todolist => todolist.id === action.todolistId)
      if (todolist) {
        todolist.filter = action.filter
        return [...state]
      }
      return state
    }
    default:
      throw new Error('Error')
  }
}

export const addTodolistAC = (todolistTitle: string) => ({
  type: 'ADD-TODOLIST' as const,
  todolistId: v1(),
  title: todolistTitle
})

export const removeTodolistAC = (todolistId: string) => ({
  type: 'REMOVE-TODOLIST' as const,
  todolistId
})

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE' as const,
  title,
  todolistId
})

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => ({
  type: 'CHANGE-TODOLIST-FILTER' as const,
  filter,
  todolistId
})

