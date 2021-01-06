import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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


function App() {
  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to Learn', filter: 'all'},
    {id: todolistId2, title: 'What to Buy', filter: 'all'}
  ])

  const [tasks, setTasks] = useState<TasksType>({
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
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    const todolistTasks = tasks[todolistId]
    tasks[todolistId] = [newTask, ...todolistTasks]
    setTasks({...tasks})
  }

  function removeTask(taskID: string, todolistId: string) {
    const todolistTasks = tasks[todolistId]
    tasks[todolistId] = todolistTasks.filter(task => task.id !== taskID)
    setTasks({...tasks})
  }

  function changeFilter(filterValue: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = filterValue
    }
    setTodolists([...todolists])
  }

  function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
    const todolistTasks = tasks[todolistId]
    const task = todolistTasks.find((task) => task.id === taskID)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }

  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(tl => tl.id != todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  function addTodolist(title: string) {
    const newTodolistID = v1()
    const newTodolist: TodolistType =
      {
        id: newTodolistID,
        title: title,
        filter: 'all'
      }
    setTodolists([...todolists, newTodolist])
    setTasks({...tasks, [newTodolistID]: []})
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    const task = tasks[todolistId].find(task => task.id === taskId)
    if (task) {
      task.title = title
      setTasks({...tasks})
    }
  }

  function changeTodolistTitle(title: string, todolistId: string) {
    const todolist = todolists.find(todolist => todolist.id === todolistId)
    if (todolist) {
      todolist.title = title
    }
    setTodolists([...todolists])
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

export default App;
