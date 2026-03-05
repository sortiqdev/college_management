import React from "react";
import { Modal, Form, Input, Select, Checkbox } from "antd";

const permissionsList = [

"Dashboard",
"Students",
"Teachers",
"Billing",
"Announcements",
"Notices",
"Organization",
"Admin Management"

]

const CreateAdminModal = ({open,setOpen}) => {

const [form] = Form.useForm()

return (

<Modal
title="Create Admin"
open={open}
onCancel={()=>setOpen(false)}
onOk={()=>form.submit()}
>

<Form
layout="vertical"
form={form}
>

<Form.Item
label="Name"
name="name"
rules={[{required:true}]}
>
<Input/>
</Form.Item>

<Form.Item
label="Email"
name="email"
rules={[{required:true}]}
>
<Input/>
</Form.Item>

<Form.Item
label="Role"
name="role"
>
<Select
options={[
{label:"Academic Admin",value:"academic"},
{label:"Billing Admin",value:"billing"},
{label:"General Admin",value:"general"}
]}
/>
</Form.Item>

<Form.Item label="Permissions" name="permissions">

<Checkbox.Group>

{permissionsList.map(p=>(
<Checkbox key={p} value={p}>
{p}
</Checkbox>
))}

</Checkbox.Group>

</Form.Item>

</Form>

</Modal>

)

}

export default CreateAdminModal