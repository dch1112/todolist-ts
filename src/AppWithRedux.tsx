import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  const dispatch = useDispatch()

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId))
  }

  function removeTask(taskID: string, todolistId: string) {
    dispatch(removeTaskAC(taskID, todolistId))
  }

  function changeFilter(filterValue: FilterValueType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, filterValue))
  }

  function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskID, isDone, todolistId))
  }

  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId))
  }

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title))
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }

  function changeTodolistTitle(title: string, todolistId: string) {
    dispatch(changeTodolistTitleAC(todolistId, title))
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
              return <Grid item key={tl.id}>
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

export default AppWithRedux;
