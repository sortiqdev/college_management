import React, { useState } from "react";
import { Card, Button, Row, Col, Statistic } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AdminTable from "./AdminTable";
import CreateAdminModal from "./CreateAdminModal";

const AdminManagement = () => {

const [openCreate,setOpenCreate] = useState(false)

return (

<Card title="Admin Management">

<Row gutter={16} style={{marginBottom:20}}>

<Col span={6}>
<Statistic title="Total Admins" value={14}/>
</Col>

<Col span={6}>
<Statistic title="Active Admins" value={11}/>
</Col>

<Col span={6}>
<Statistic title="Suspended" value={3}/>
</Col>

<Col span={6}>
<Button
type="primary"
icon={<PlusOutlined />}
onClick={()=>setOpenCreate(true)}
>
Add Admin
</Button>
</Col>

</Row>

<AdminTable/>

<CreateAdminModal
open={openCreate}
setOpen={setOpenCreate}
/>

</Card>

)
}

export default AdminManagement