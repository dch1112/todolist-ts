import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string, todoListId: string) => void
  changeFilter: (filterValue: FilterValueType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
  filter: FilterValueType
  removeTodoList: (todoListId: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
}

export function TodoList(props: PropsType) {
  // const [title, setTitle] = useState<string>('')
  // const [error, setError] = useState<string | null>(null)

  const onChangeTodoListTitleHandler = (title: string) => {
    if (title.trim()) {
      props.changeTodoListTitle(title.trim(), props.todoListId)
    }
  }

  const tasks = props.tasks.map(task => {
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
    }

    const onChangeTaskTitleHandler = (title: string) => {
      debugger
      if (title.trim()) {
        props.changeTaskTitle(task.id, title.trim(), props.todoListId)
      }
    }

    const onClickHandler = () => {
      props.removeTask(task.id, props.todoListId)
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
    props.changeFilter('all', props.todoListId)
  }
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.todoListId)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter('completed', props.todoListId)
  }

  const onRemoveTodoListHandler = () => {
    props.removeTodoList(props.todoListId)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.todoListId)
  }


  return (
    <div>
      <h3><EditableSpan value={props.title}
                        getNewTitle={onChangeTodoListTitleHandler}/>
        <IconButton onClick={onRemoveTodoListHandler}>
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