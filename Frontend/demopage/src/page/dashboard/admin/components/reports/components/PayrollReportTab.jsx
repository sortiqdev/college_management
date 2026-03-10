import React from "react";
import { Table } from "antd";

const PayrollReportTab = () => {

  const columns = [
    {
      title: "Employee",
      dataIndex: "name"
    },
    {
      title: "Department",
      dataIndex: "department"
    },
    {
      title: "Salary",
      dataIndex: "salary"
    },
    {
      title: "Bonus",
      dataIndex: "bonus"
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={[]}
      bordered
    />
  );
};

export default PayrollReportTab;