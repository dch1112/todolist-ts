import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeFilter: (filterValue: FilterValueType) => void
  addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
  const [title, setTitle] = useState<string>('')
  const tasks = props.tasks.map(task => {
    const onClickHandler = () => {
      props.removeTask(task.id)
    }
    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
        />
        <span>{task.title}</span>
        <button onClick={onClickHandler}>x
        </button>
      </li>
    )
  })
  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }

  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('completed')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasks}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}>All
        </button>
        <button
          onClick={onActiveClickHandler}>Active
        </button>
        <button
          onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}