import React from "react";
import { Tabs, Card } from "antd";
import {
  DollarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  CreditCardOutlined
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Payroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname.split("/").pop();

  const items = [
    {
      key: "teacher-payroll",
      label: (
        <span>
          <TeamOutlined /> Teacher Payroll
        </span>
      )
    },
    {
      key: "salary-structure",
      label: (
        <span>
          <DollarOutlined /> Salary Structure
        </span>
      )
    },
    {
      key: "approval",
      label: (
        <span>
          <CheckCircleOutlined /> Payroll Approval
        </span>
      )
    },
    {
      key: "change-request",
      label: (
        <span>
          <FileTextOutlined /> Change Requests
        </span>
      )
    },
    {
      key: "student-fees",
      label: (
        <span>
          <CreditCardOutlined /> Student Fees
        </span>
      )
    }
  ];

  const handleChange = (key) => {
    navigate(`${key}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card
        title="Payroll & Fees Management"
        bordered={false}
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}
      >
        <Tabs
          activeKey={activeKey}
          items={items}
          onChange={handleChange}
          type="card"
          size="large"
        />

        <div style={{ marginTop: "20px" }}>
          <Outlet />
        </div>
      </Card>
    </div>
  );
};

export default Payroll;