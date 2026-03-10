import React from "react";
import { Tabs, Card } from "antd";

import StudentFeeReport from "./components/StudentFeeReport";
import BusFeeReport from "./components/BusFeeReport";
import HostelFeeReport from "./components/HostelFeeReport";
import PayrollReportTab from "./components/PayrollReportTab";

const { TabPane } = Tabs;

const FeeReport = () => {
  return (
    <Card title="Fee Structure Reports">

      <Tabs defaultActiveKey="1">

        <TabPane tab="Student Fees" key="1">
          <StudentFeeReport />
        </TabPane>

        <TabPane tab="Bus Fees" key="2">
          <BusFeeReport />
        </TabPane>

        <TabPane tab="Hostel Fees" key="3">
          <HostelFeeReport />
        </TabPane>

        <TabPane tab="Payroll" key="4">
          <PayrollReportTab />
        </TabPane>

      </Tabs>

    </Card>
  );
};

export default FeeReport;