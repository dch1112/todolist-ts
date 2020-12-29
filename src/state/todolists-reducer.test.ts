import {ChangeTodoListFilterActionType, ChangeTodoListTitleActionType, todoListsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../App';

test('correct todolist should be removed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListsReducer(startState, { type: 'REMOVE-TODOLIST', todoListId: todoListId1})

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  const action: ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE' as const,
    todoListId: todoListId2,
    title: newTodoListTitle
  };

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "completed";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const action: ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todoListId: todolistId2,
    filter: newFilter
  };

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
