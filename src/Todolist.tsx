import React from "react";
import { TaskType } from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  removeTask: (taskID: number) => void
}

export function TodoList(props: PropsType) {
  const tasks = props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={ () => {props.removeTask(task.id)}}>x</button>
      </li>
    )
  })

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasks}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}