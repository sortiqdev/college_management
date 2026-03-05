import React,{useState} from "react";
import { Table, Tag, Button } from "antd";
import PermissionDrawer from "./PermissionDrawer";

const AdminTable = () => {

const [openDrawer,setOpenDrawer] = useState(false)

const data = [

{
key:1,
name:"Rahul Sharma",
email:"rahul@school.com",
role:"Academic Admin",
permissions:["Students","Teachers","Notices"],
status:"Active"
},

{
key:2,
name:"Aman Verma",
email:"aman@school.com",
role:"Billing Admin",
permissions:["Billing","Reports"],
status:"Active"
}

]

const columns = [

{
title:"Name",
dataIndex:"name"
},

{
title:"Email",
dataIndex:"email"
},

{
title:"Role",
dataIndex:"role"
},

{
title:"Permissions",
render:(record)=>(
<>
{record.permissions.map(p=>(
<Tag color="blue" key={p}>{p}</Tag>
))}
</>
)
},

{
title:"Status",
render:(record)=>(
<Tag color={record.status==="Active"?"green":"red"}>
{record.status}
</Tag>
)
},

{
title:"Action",
render:()=>(
<Button
type="link"
onClick={()=>setOpenDrawer(true)}
>
View Permissions
</Button>
)
}

]

return(

<>

<Table
columns={columns}
dataSource={data}
pagination={{pageSize:6}}
/>

<PermissionDrawer
open={openDrawer}
setOpen={setOpenDrawer}
/>

</>

)

}

export default AdminTable