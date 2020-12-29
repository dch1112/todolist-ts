import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
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

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

const todoListId1 = v1()
const todoListId2 = v1()


function App() {
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: 'What to Learn', filter: 'all'},
    {id: todoListId2, title: 'What to Buy', filter: 'all'}
  ])

  const [tasks, setTasks] = useState<TasksType>({
    [todoListId1]:
      [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
      ],
    [todoListId2]:
      [{id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Meat", isDone: true},
        {id: v1(), title: "Fish", isDone: false}
      ]
  })

  function addTask(title: string, todoListId: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = [newTask, ...todoListTasks]
    setTasks({...tasks})
  }

  function removeTask(taskID: string, todoListId: string) {
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = todoListTasks.filter(task => task.id !== taskID)
    setTasks({...tasks})
  }

  function changeFilter(filterValue: FilterValueType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = filterValue
    }
    setTodoLists([...todoLists])
  }

  function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
    const todoListTasks = tasks[todoListId]
    const task = todoListTasks.find((task) => task.id === taskID)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }

  function removeTodoList(todoListId: string) {
    setTodoLists(todoLists.filter(tl => tl.id != todoListId))
    delete tasks[todoListId]
    setTasks({...tasks})
  }

  function addTodoList(title: string) {
    const newTodoListID = v1()
    const newTodoList: TodoListType =
      {
        id: newTodoListID,
        title: title,
        filter: 'all'
      }
    setTodoLists([...todoLists, newTodoList])
    setTasks({...tasks, [newTodoListID]: []})
  }

  function changeTaskTitle(taskId: string, title: string, todoListId: string) {
    const task = tasks[todoListId].find(task => task.id === taskId)
    if (task) {
      task.title = title
      setTasks({...tasks})
    }
  }

  function changeTodoListTitle(title: string, todoListId: string) {
    const todoList = todoLists.find(todoList => todoList.id === todoListId)
    if (todoList) {
      todoList.title = title
    }
    setTodoLists([...todoLists])
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
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={5}>
          {
            todoLists.map(tl => {
              let tasksForTodoList = tasks[tl.id]
              if (tl.filter === 'active') {
                tasksForTodoList = tasks[tl.id].filter(task => !task.isDone)
              }
              if (tl.filter === 'completed') {
                tasksForTodoList = tasks[tl.id].filter(task => task.isDone)
              }
              return <Grid item>
                <Paper elevation={5} style={{padding: '15px', borderRadius: '5px'}} square={false}>
                  <TodoList
                    title={tl.title}
                    key={tl.id}
                    todoListId={tl.id}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
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
