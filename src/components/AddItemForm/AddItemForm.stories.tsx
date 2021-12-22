import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Component} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title:'AddItemForm Component',
    component:AddItemForm,
    // argTypes:{
    //     callBack:{
    //         description:'Button inside from clicked +'
    //     }
    // }
} as ComponentMeta<typeof AddItemForm>

const Template:ComponentStory<typeof AddItemForm> = (args) => <AddItemForm{...args}/>

export const AddItemFromStory = Template.bind({});

AddItemFromStory.args = {
    callBack:action('Button inside from clicked')
}
