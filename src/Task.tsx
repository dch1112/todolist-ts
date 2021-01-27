import React, {ChangeEvent, FunctionComponent} from 'react';
import {Button, Checkbox} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";

interface OwnProps {
  taskId: string
  title: string
  isDone: boolean
  todolistId: string
  removeTask: (taskID: string, todolistId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export type Props = OwnProps;

const Task: FunctionComponent<Props> = React.memo((props) => {
  const {
    taskId,
    title,
    isDone,
    todolistId,
    removeTask,
    changeTaskStatus,
    changeTaskTitle,
  } = props

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(taskId, e.currentTarget.checked, todolistId)
  }

  const onChangeTaskTitleHandler = (title: string) => {
    if (title.trim()) {
      changeTaskTitle(taskId, title.trim(), todolistId)
    }
  }

  const onClickHandler = () => {
    removeTask(taskId, todolistId)
  }

  return (
    <li>
      <Checkbox
        color={"primary"}
        checked={isDone}
        onChange={onChangeTaskStatusHandler}
      />

      <span className={isDone ? 'is-done' : ''}>
        <EditableSpan value={title} getNewTitle={onChangeTaskTitleHandler}/>
        </span>
      <Button onClick={onClickHandler}>
        <Delete/>
      </Button>
    </li>);
})

export default Task;