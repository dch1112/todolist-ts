import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import AppWithRedux from "./AppWithRedux";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux/>;

export const AppWithReduxExample = Template.bind({});
