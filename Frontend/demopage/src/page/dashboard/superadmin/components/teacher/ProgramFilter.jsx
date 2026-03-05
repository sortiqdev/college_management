import React from "react";
import { Row, Col, Select, Button, Card } from "antd";

const ProgramFilter = ({ department, setDepartment, program, setProgram }) => {

const departmentOptions = [
  { label: "Computer Science", value: "cse" },
  { label: "Mechanical", value: "me" },
  { label: "Electronics", value: "ece" },
];

const programOptions = [
  { label: "B.Tech", value: "btech" },
  { label: "M.Tech", value: "mtech" },
  { label: "MBA", value: "mba" },
];

const resetFilters = () => {
  setDepartment(null);
  setProgram(null);
};

return (

<Card style={{ marginBottom: 20 }} title="Filter Teachers">

<Row gutter={16}>

<Col span={10}>
<Select
placeholder="Select Department"
value={department}
onChange={setDepartment}
options={departmentOptions}
style={{ width: "100%" }}
/>
</Col>

<Col span={10}>
<Select
placeholder="Select Program"
value={program}
onChange={setProgram}
options={programOptions}
style={{ width: "100%" }}
/>
</Col>

<Col span={4}>
<Button block onClick={resetFilters}>
Reset
</Button>
</Col>

</Row>

</Card>

);

};

export default ProgramFilter;