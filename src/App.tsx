import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false}
  ])

  const [filter, setFilter] = useState<FilterValueType>('all')

  function removeTask(taskID: number) {
    const filteredTasks = tasks.filter(task => task.id !== taskID)
    setTasks(filteredTasks)
  }

  function changeFilter(filterValue: FilterValueType) {
    setFilter(filterValue)
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
      />
    </div>
  );
}

export default App;
