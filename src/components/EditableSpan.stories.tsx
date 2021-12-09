import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskStatuses} from "../api/todolistsApi";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    // argTypes:{
    //     callBack:{
    //         description:'Button inside from clicked'
    //     }
    // }
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan{...args}/>

export const EditableSpanFromStory = Template.bind({});

EditableSpanFromStory.args = {
    title: 'string',
    status: TaskStatuses.Complete,
    callBack: action('Action')
}
