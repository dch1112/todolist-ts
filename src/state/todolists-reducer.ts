import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST'
  todoListId: string
}

export type AddTodoListActionType = {
  type: 'ADD-TODOLIST'
  title: string
}

export type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  todoListId: string
  title: string
}


export type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  todoListId: string
  filter: FilterValueType
}


type ActionsType = RemoveTodoListActionType |
  AddTodoListActionType |
  ChangeTodoListTitleActionType |
  ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id != action.todoListId)
    case 'ADD-TODOLIST':
      const newTodoListID = v1()
      const newTodoList: TodoListType =
        {
          id: newTodoListID,
          title: action.title,
          filter: 'all'
        }
      return [...state, newTodoList]
    case 'CHANGE-TODOLIST-TITLE':
      const todoList = state.find(todoList => todoList.id === action.todoListId)
      if (todoList) {
        todoList.title = action.title
        return [...state]
      }
      return state
    case 'CHANGE-TODOLIST-FILTER': {
      const todoList = state.find(todoList => todoList.id === action.todoListId)
      if (todoList) {
        todoList.filter = action.filter
        return [...state]
      }
      return state
    }
    default:
      throw new Error('Error')
  }
}
