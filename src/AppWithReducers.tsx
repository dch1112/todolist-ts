import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

const todolistId1 = v1()
const todolistId2 = v1()


function AppWithReducers() {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to Learn', filter: 'all'},
    {id: todolistId2, title: 'What to Buy', filter: 'all'}
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]:
      [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
      ],
    [todolistId2]:
      [{id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Meat", isDone: true},
        {id: v1(), title: "Fish", isDone: false}
      ]
  })

  function addTask(title: string, todolistId: string) {
    dispatchToTasks(addTaskAC(title, todolistId))
  }

  function removeTask(taskID: string, todolistId: string) {
    dispatchToTasks(removeTaskAC(taskID, todolistId))
  }

  function changeFilter(filterValue: FilterValueType, todolistId: string) {
    dispatchToTodolists(changeTodolistFilterAC(todolistId, filterValue))
  }

  function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
    dispatchToTasks(changeTaskStatusAC(taskID, isDone, todolistId))
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId))
  }

  function changeTodolistTitle(title: string, todolistId: string) {
    dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '15px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={5}>
          {
            todolists.map(tl => {
              let tasksForTodolist = tasks[tl.id]
              if (tl.filter === 'active') {
                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
              }
              if (tl.filter === 'completed') {
                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
              }
              return <Grid item>
                <Paper elevation={5} style={{padding: '15px', borderRadius: '5px'}} square={false}>
                  <Todolist
                    title={tl.title}
                    key={tl.id}
                    todolistId={tl.id}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
