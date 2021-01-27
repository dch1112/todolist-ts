import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import Task, {Props as TaskPropsType} from "./Task";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {},
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>;

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  taskId: '1',
  isDone: true,
  title: 'JS',
  todolistId: 'todolistId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  taskId: '2',
  isDone: false,
  title: 'CSS',
  todolistId: 'todolistId2'
};
