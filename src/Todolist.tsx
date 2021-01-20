import React, {ChangeEvent, useCallback} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";
import TaskHooks from "./TaskHooks";

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

export const Todolist = React.memo(function (props: PropsType) {
  console.log('Todolist rendered')
  let tasksForTodolist = props.tasks
  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(task => !task.isDone)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(task => task.isDone)
  }

  const onChangeTodolistTitleHandler = useCallback((title: string) => {
    if (title.trim()) {
      props.changeTodolistTitle(title.trim(), props.todolistId)
    }
  }, [props.changeTodolistTitle, props.todolistId])

  const tasks = tasksForTodolist.map(task => {

    return (
      <Task
        key={task.id}
        taskId={task.id}
        title={task.title}
        isDone={task.isDone}
        todolistId={props.todolistId}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
      />
      // <TaskHooks
      //   key={task.id}
      //   taskId={task.id}
      //   todolistId={props.todolistId}
      // />
    )
  })

  const onAllClickHandler = useCallback(() => {
    props.changeFilter('all', props.todolistId)
  }, [props.changeFilter, props.todolistId])

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter('active', props.todolistId)
  }, [props.changeFilter, props.todolistId])

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter('completed', props.todolistId)
  }, [props.changeFilter, props.todolistId])

  const onRemoveTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todolistId)
  }, [props.addTask, props.todolistId])

  return (
    <div>
      <h3>
        <EditableSpan
          value={props.title}
          getNewTitle={onChangeTodolistTitleHandler}
        />
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
})