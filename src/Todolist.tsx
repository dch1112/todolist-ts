import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
  // const [title, setTitle] = useState<string>('')
  // const [error, setError] = useState<string | null>(null)

  const onChangeTodolistTitleHandler = (title: string) => {
    if (title.trim()) {
      props.changeTodolistTitle(title.trim(), props.todolistId)
    }
  }

  const tasks = props.tasks.map(task => {
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
    }

    const onChangeTaskTitleHandler = (title: string) => {
      debugger
      if (title.trim()) {
        props.changeTaskTitle(task.id, title.trim(), props.todolistId)
      }
    }

    const onClickHandler = () => {
      props.removeTask(task.id, props.todolistId)
    }

    return (
      <li key={task.id}>
        <Checkbox
          color={"primary"}
          checked={task.isDone}
          onChange={onChangeTaskStatusHandler}
        />

        <span className={task.isDone ? 'is-done' : ''}>
        <EditableSpan value={task.title} getNewTitle={onChangeTaskTitleHandler}/>
        </span>
        <Button onClick={onClickHandler}>
          <Delete/>
        </Button>
      </li>
    )
  })

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

  const addTask = (title: string) => {
    props.addTask(title, props.todolistId)
  }


  return (
    <div>
      <h3><EditableSpan value={props.title}
                        getNewTitle={onChangeTodolistTitleHandler}/>
        <IconButton onClick={onRemoveTodolistHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>

      <ul style={{listStyle: 'none', padding: '0'}}>
        {tasks}
      </ul>
      <div>
        <ButtonGroup>
          <Button
            onClick={onAllClickHandler}
            color={"primary"}
            variant={props.filter === 'all' ? "contained" : "outlined"}>
            All
          </Button>
          <Button
            onClick={onActiveClickHandler}
            color={"primary"}
            variant={props.filter === 'active' ? "contained" : "outlined"}>
            Active
          </Button>
          <Button
            onClick={onCompletedClickHandler}
            color={"primary"}
            variant={props.filter === 'completed' ? "contained" : "outlined"}>
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}