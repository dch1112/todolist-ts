import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string, todolistId: string) => void
  changeFilter: (filterValue: FilterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const tasks = props.tasks.map(task => {
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
    }

    const onClickHandler = () => {
      props.removeTask(task.id, props.todolistId)
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
      props.addTask(title.trim(), props.todolistId)
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

  const onAllClickHandler = () => {
    props.changeFilter('all', props.todolistId)
  }
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.todolistId)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter('completed', props.todolistId)
  }

  const onRemoveTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  return (
    <div>
      <h3>{props.title}<button onClick={onRemoveTodolistHandler}>x
      </button></h3>
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