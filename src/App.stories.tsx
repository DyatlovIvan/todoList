import {App} from "./App";
import {Component} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title:'App Component',
    component:App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template:ComponentStory<typeof App> = () => <App/>

export const AppStory = Template.bind({});