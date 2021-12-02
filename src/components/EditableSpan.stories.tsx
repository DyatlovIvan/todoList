import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {Component} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title:'EditableSpan Component',
    component:EditableSpan,
    // argTypes:{
    //     callBack:{
    //         description:'Button inside from clicked'
    //     }
    // }
} as ComponentMeta<typeof EditableSpan>

const Template:ComponentStory<typeof EditableSpan> = (args) => <EditableSpan{...args}/>

export const EditableSpanFromStory = Template.bind({});

EditableSpanFromStory.args = {
    // callBack:action('Button inside from clicked')
    title: 'string',
    isDone: true,
    callBack: action('Action')
}
