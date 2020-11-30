import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeFilter: (filterValue: FilterValueType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
  filter: FilterValueType
}

export function TodoList(props: PropsType) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const tasks = props.tasks.map(task => {
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, e.currentTarget.checked)
    }

    const onClickHandler = () => {
      props.removeTask(task.id)
    }

    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={onChangeTaskStatusHandler}
        />
        <span className={task.isDone ? 'is-done' : ''}>
          {task.title}
        </span>
        <button onClick={onClickHandler}>x
        </button>
      </li>
    )
  })
  const addTask = () => {
    if (title.trim()) {
      props.addTask(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
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
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}/>
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <ul>
        {tasks}
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}