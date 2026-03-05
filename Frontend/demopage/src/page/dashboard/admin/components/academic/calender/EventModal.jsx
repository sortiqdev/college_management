import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { createEvent } from "../../../../../../services/clenadarService";

export default function EventModal({open,setOpen,reload}){

const [form] = Form.useForm();

const submit = async(values)=>{

 await createEvent(values);

 reload();

 setOpen(false);
};

return(

<Modal
open={open}
title="Add Academic Event"
onCancel={()=>setOpen(false)}
onOk={()=>form.submit()}
>

<Form form={form} layout="vertical" onFinish={submit}>

<Form.Item name="title" label="Event Title" required>
<Input/>
</Form.Item>

<Form.Item name="type" label="Type">

<Select>

<Select.Option value="holiday">
Holiday
</Select.Option>

<Select.Option value="exam">
Exam
</Select.Option>

<Select.Option value="event">
Event
</Select.Option>

<Select.Option value="meeting">
Meeting
</Select.Option>

</Select>

</Form.Item>

<Form.Item name="startDate" label="Start Date">
<DatePicker/>
</Form.Item>

<Form.Item name="endDate" label="End Date">
<DatePicker/>
</Form.Item>

<Form.Item name="description" label="Description">
<Input.TextArea/>
</Form.Item>

</Form>

</Modal>

);

}