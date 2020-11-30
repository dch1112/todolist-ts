import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from 'uuid';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false}
  ])

  const [filter, setFilter] = useState<FilterValueType>('all')

  function addTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }

  function removeTask(taskID: string) {
    const filteredTasks = tasks.filter(task => task.id !== taskID)
    setTasks(filteredTasks)
  }

  function changeFilter(filterValue: FilterValueType) {
    setFilter(filterValue)
  }

  function changeStatus(taskID: string, isDone: boolean) {
    const task = tasks.find((task) => task.id === taskID)
    if (task) {
      task.isDone = isDone
      setTasks([...tasks])
    }
  }

  let tasksForTodoList = tasks
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(task => task.isDone)
  }

  return (
    <div className="App">
      <TodoList title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
      />
    </div>
  );
}

export default App;
