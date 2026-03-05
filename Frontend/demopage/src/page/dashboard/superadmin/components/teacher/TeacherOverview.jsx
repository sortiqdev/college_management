import React, { useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import TeacherTable from "./TeacherTable";
import ProgramFilter from "./ProgramFilter";

const TeacherOverview = () => {

const [department, setDepartment] = useState(null);
const [program, setProgram] = useState(null);

return (

<Card title="Teacher Analytics">

<Row gutter={16} style={{ marginBottom: 20 }}>

<Col span={8}>
<Statistic title="Total Teachers" value={120} />
</Col>

<Col span={8}>
<Statistic title="Departments" value={6} />
</Col>

<Col span={8}>
<Statistic title="Programs" value={12} />
</Col>

</Row>

<ProgramFilter
department={department}
setDepartment={setDepartment}
program={program}
setProgram={setProgram}
/>

<TeacherTable department={department} program={program} />

</Card>

);

};

export default TeacherOverview;