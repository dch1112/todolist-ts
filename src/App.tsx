import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type todolistType = {
  id: string
  title: string
  filter: FilterValueType
}

const todolistId1 = v1()
const todolistId2 = v1()


function App() {
  const [todolists, setTodolists] = useState<Array<todolistType>>([
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

  function removeTodolist (todolistId: string) {
    setTodolists(todolists.filter(tl => tl.id != todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  return (
    <div className="App">
      {todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
          tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
        }

debugger
        return <Todolist title={tl.title}
                         key={tl.id}
                         todolistId={tl.id}
                         tasks={tasksForTodolist}
                         removeTask={removeTask}
                         changeFilter={changeFilter}
                         addTask={addTask}
                         changeTaskStatus={changeStatus}
                         filter={tl.filter}
                         removeTodolist={removeTodolist}
        />
      })}
    </div>
  );
}

export default App;
