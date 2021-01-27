import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import EditableSpan, {Props as EditableSpanPropsType} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'Value EditableSpanChanged'
    },
    value: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    }
  },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  getNewTitle: action('Value EditableSpanChanged')
};
