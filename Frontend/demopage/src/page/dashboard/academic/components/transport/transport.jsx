import React from "react";
import { Tabs } from "antd";

import RoutesTable from "./RoutesTable";
import StopsTable from "./StopTable";
import StudentsTable from "./StudentTable";
import CoordinatorTable from "./CoordinatorTable";
import AttendanceTable from "./AttendanceTable";

const Transport = () => {

  const items = [
    {
      key: "1",
      label: "Routes",
      children: <RoutesTable />
    },
    {
      key: "2",
      label: "Stops & Timings",
      children: <StopsTable />
    },
    {
      key: "3",
      label: "Assign Students",
      children: <StudentsTable />
    },
    {
      key: "4",
      label: "Bus Coordinator",
      children: <CoordinatorTable />
    },
    {
      key: "5",
      label: "Bus Attendance",
      children: <AttendanceTable />
    }
  ];

  return (
    <div className="p-4">
      <h2>Transport Management</h2>

      <Tabs items={items} />
    </div>
  );
};

export default Transport;