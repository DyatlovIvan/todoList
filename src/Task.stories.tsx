import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {v1} from "uuid";
import {store} from "./store";
import {Provider} from "react-redux";

export default {
    title:'Task Component',
    component:Task,
    // argTypes:{
    //     task:  {"id": v1(), "title": 'HTML', "isDone": true},
    //     todoListID: '1'
    // }
} as ComponentMeta<typeof Task>

const Template:ComponentStory<typeof Task> = (args) => <Provider store={store}><Task{...args}/></Provider>

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task:  {"id": v1(), "title": 'HTML', "isDone": true},
    todoListID: '1'
}
export const TaskNotIsDoneStory = Template.bind({});
TaskNotIsDoneStory.args = {
    task:  {"id": v1(), "title": 'HTML', "isDone": false},
    todoListID: '1'
}
