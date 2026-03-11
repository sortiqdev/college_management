/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Button, Input } from "antd";

const StopsTable = () => {

  const [data, setData] = useState([
    { stop: "Main Chowk", time: "7:30 AM" },
    { stop: "Central Park", time: "7:45 AM" }
  ]);

  const columns = [
    {
      title: "Stop Name",
      dataIndex: "stop"
    },
    {
      title: "Time",
      dataIndex: "time"
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
    />
  );
};

export default StopsTable;