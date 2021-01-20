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

const InitialState: Array<TodolistType> = [
  {id: 'todolistId1', title: 'What to Learn', filter: 'all'},
  {id: 'todolistId2', title: 'What to Buy', filter: 'all'}
]

export const todolistsReducer = (state = InitialState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId)
    case 'ADD-TODOLIST':
      const newTodolist: TodolistType =
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all'
        }
      return [...state, newTodolist]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
    }
    default:
      return state
  }
}

export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => ({
  type: 'ADD-TODOLIST',
  todolistId: v1(),
  title: todolistTitle
})

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
  type: 'REMOVE-TODOLIST',
  todolistId
})

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({
  type: 'CHANGE-TODOLIST-TITLE',
  title,
  todolistId
})

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterActionType => ({
  type: 'CHANGE-TODOLIST-FILTER',
  filter,
  todolistId
})

