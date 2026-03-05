import React from "react";
import { Tabs, Card } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  DollarOutlined,
  ApartmentOutlined,
  CreditCardOutlined,
  BarChartOutlined
} from "@ant-design/icons";

const Fees = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname.split("/").pop();

  const items = [
    {
      key: "structure",
      label: (
        <span>
          <DollarOutlined /> Fee Structure
        </span>
      ),
    },
    {
      key: "program-map",
      label: (
        <span>
          <ApartmentOutlined /> Program Mapping
        </span>
      ),
    },
    {
      key: "collection",
      label: (
        <span>
          <CreditCardOutlined /> Fee Collection
        </span>
      ),
    },
   
  ];

  const handleChange = (key) => {
    navigate(`/dashboard/admin/fees/${key}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <Card title="Fees Management">
        <Tabs
          items={items}
          activeKey={activeKey}
          onChange={handleChange}
          type="card"
        />

        <div style={{ marginTop: 20 }}>
          <Outlet />
        </div>
      </Card>
    </div>
  );
};

export default Fees;