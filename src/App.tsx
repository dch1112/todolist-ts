import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

let [tasks, setTasks] = useState <Array<TaskType>> ([
  {id: 1, title: "HTML&CSS", isDone: true},
  {id: 2, title: "JS", isDone: true},
  {id: 3, title: "React", isDone: false}
])

function removeTask(taskID: number) {
  tasks = tasks.filter(task => task.id !== taskID)
  // console.log(taskID)
}

function App() {
  return (
    <div className="App">
      <TodoList title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
      />
    </div>
  );
}

export default App;
