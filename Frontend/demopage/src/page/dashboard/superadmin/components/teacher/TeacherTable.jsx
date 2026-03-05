import React from "react";
import { Table, Tag } from "antd";

const TeacherTable = ({ department, program }) => {

const data = [
{
key: 1,
name: "Dr. Amit Sharma",
department: "cse",
program: "btech",
subject: "Data Structures",
salary: 90000,
status: "Active"
},
{
key: 2,
name: "Dr. Neha Gupta",
department: "cse",
program: "btech",
subject: "Operating Systems",
salary: 85000,
status: "Active"
},
{
key: 3,
name: "Dr. Raj Verma",
department: "me",
program: "btech",
subject: "Thermodynamics",
salary: 80000,
status: "Active"
},
{
key: 4,
name: "Dr. Pooja Singh",
department: "ece",
program: "mtech",
subject: "Digital Signal Processing",
salary: 95000,
status: "Inactive"
},
{
key: 5,
name: "Dr. Ankit Mehta",
department: "cse",
program: "mtech",
subject: "Machine Learning",
salary: 100000,
status: "Active"
}
];


// Filter Logic
const filteredData = data.filter((teacher) => {

let matchDepartment = true;
let matchProgram = true;

if (department) {
matchDepartment = teacher.department === department;
}

if (program) {
matchProgram = teacher.program === program;
}

return matchDepartment && matchProgram;

});


const columns = [

{
title: "Teacher Name",
dataIndex: "name",
key: "name",
},

{
title: "Department",
dataIndex: "department",
key: "department",
render: (dep) => (
<Tag color="blue">
{dep.toUpperCase()}
</Tag>
)
},

{
title: "Program",
dataIndex: "program",
key: "program",
render: (prog) => (
<Tag color="purple">
{prog.toUpperCase()}
</Tag>
)
},

{
title: "Subject",
dataIndex: "subject",
key: "subject",
},

{
title: "Salary",
dataIndex: "salary",
key: "salary",
sorter: (a, b) => a.salary - b.salary,
render: (salary) => `₹${salary.toLocaleString()}`
},

{
title: "Status",
dataIndex: "status",
key: "status",
render: (status) => (
<Tag color={status === "Active" ? "green" : "red"}>
{status}
</Tag>
)
}

];

return (

<Table
columns={columns}
dataSource={filteredData}
pagination={{ pageSize: 6 }}
rowKey="key"
/>

);

};

export default TeacherTable;