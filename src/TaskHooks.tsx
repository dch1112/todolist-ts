import React, {ChangeEvent, FunctionComponent} from 'react';
import {Button, Checkbox} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";

interface OwnProps {
  taskId: string
  todolistId: string
}

type Props = OwnProps;

const TaskHooks: FunctionComponent<Props> = React.memo((props) => {
  const {
    taskId,
    todolistId,
  } = props

  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId].filter(task => task.id === props.taskId)[0])
  const dispatch = useDispatch()

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistId))
  }

  const onChangeTaskTitleHandler = (title: string) => {
    if (title.trim()) {
      dispatch(changeTaskTitleAC(props.taskId, title.trim(), props.todolistId))
    }
  }

  const onClickHandler = () => {
    dispatch(removeTaskAC(props.taskId, props.todolistId))
  }

  return (
    <li>
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
    </li>);
})

export default TaskHooks;