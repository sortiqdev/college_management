import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table, Tag, Spin } from "antd";
import axios from "axios";

const Students = () => {

const [loading,setLoading] = useState(true);
const [students,setStudents] = useState([]);
const [summary,setSummary] = useState({});

const staticStudents = [
{
id:1,
name:"Rahul Sharma",
department:"Computer Science",
program:"B.Tech",
course:"AI",
bus:true,
hostel:false,
semesterFees:80000,
paid:50000
},
{
id:2,
name:"Simran Kaur",
department:"Computer Science",
program:"B.Tech",
course:"Data Science",
bus:false,
hostel:true,
semesterFees:80000,
paid:80000
},
{
id:3,
name:"Aman Singh",
department:"Mechanical",
program:"B.Tech",
course:"Robotics",
bus:true,
hostel:true,
semesterFees:75000,
paid:30000
}
];

const calculateSummary = (data)=>{

const total = data.length;
const bus = data.filter(s=>s.bus).length;
const hostel = data.filter(s=>s.hostel).length;

const totalFees = data.reduce((a,b)=>a+b.semesterFees,0);
const received = data.reduce((a,b)=>a+b.paid,0);

const pending = totalFees - received;

const busRevenue = bus * 15000;
const hostelRevenue = hostel * 30000;

return {
totalStudents:total,
busUsers:bus,
hostelUsers:hostel,
totalFees,
receivedFees:received,
pendingFees:pending,
busRevenue,
hostelRevenue
}

}

const fetchStudents = async ()=>{

try{

const res = await axios.get("/api/students/organization/1");

let studentData =
res?.data?.students?.length > 0
? res.data.students
: staticStudents;

setStudents(studentData);
setSummary(calculateSummary(studentData));

}catch(err){
console.error(`not geeting data ${err.message}`)
setStudents(staticStudents);
setSummary(calculateSummary(staticStudents));

}

setLoading(false);

}

useEffect(()=>{
// eslint-disable-next-line react-hooks/set-state-in-effect
fetchStudents();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const columns = [

{ title:"Student", dataIndex:"name" },

{ title:"Department", dataIndex:"department" },

{ title:"Program", dataIndex:"program" },

{ title:"Course", dataIndex:"course" },

{
title:"Bus",
render:(row)=> row.bus ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>
},

{
title:"Hostel",
render:(row)=> row.hostel ? <Tag color="blue">Yes</Tag> : <Tag>No</Tag>
},

{ title:"Semester Fees", dataIndex:"semesterFees" },

{ title:"Paid", dataIndex:"paid" },

{
title:"Pending",
render:(row)=> row.semesterFees - row.paid
}

];

if(loading){
return <Spin size="large" />;
}

return (

<div style={{padding:20}}>

<Row gutter={16}>

<Col span={6}>
<Card>
<Statistic title="Total Students" value={summary.totalStudents}/>
</Card>
</Col>

<Col span={6}>
<Card>
<Statistic title="Bus Users" value={summary.busUsers}/>
</Card>
</Col>

<Col span={6}>
<Card>
<Statistic title="Hostel Users" value={summary.hostelUsers}/>
</Card>
</Col>

<Col span={6}>
<Card>
<Statistic title="Total Fees Generated" value={summary.totalFees} prefix="₹"/>
</Card>
</Col>

</Row>

<br/>

<Row gutter={16}>

<Col span={6}>
<Card>
<Statistic title="Received Fees" value={summary.receivedFees} prefix="₹"/>
</Card>
</Col>

<Col span={6}>
<Card>
<Statistic title="Pending Fees" value={summary.pendingFees} prefix="₹"/>
</Card>
</Col>

<Col span={6}>
<Card>
<Statistic title="Bus Revenue" value={summary.busRevenue} prefix="₹"/>
</Card>
</Col>

<Col span={6}>
<Card>
<Statistic title="Hostel Revenue" value={summary.hostelRevenue} prefix="₹"/>
</Card>
</Col>

</Row>

<br/>

<Card title="Students Data">

<Table
columns={columns}
dataSource={students}
rowKey="id"
/>

</Card>

</div>

)

}

export default Students;