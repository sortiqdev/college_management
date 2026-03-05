import React from "react";
import { Drawer, Checkbox } from "antd";

const permissions = [

"Dashboard",
"Students",
"Teachers",
"Billing",
"Announcements",
"Notices",
"Organization",
"Admin Management"

]

const PermissionDrawer = ({open,setOpen}) => {

return(

<Drawer
title="Admin Permissions"
open={open}
onClose={()=>setOpen(false)}
width={350}
>

<Checkbox.Group style={{display:"grid",gap:10}}>

{permissions.map(p=>(
<Checkbox key={p}>{p}</Checkbox>
))}

</Checkbox.Group>

</Drawer>

)

}

export default PermissionDrawer