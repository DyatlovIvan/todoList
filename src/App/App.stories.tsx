import {App} from "./App";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title:'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template:ComponentStory<typeof App> = () => <App demo = {true}/>

export const AppStory = Template.bind({});
