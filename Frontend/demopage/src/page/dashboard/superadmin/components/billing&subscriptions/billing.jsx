import React from "react";
import {
  Card,
  Table,
  Tag,
  Row,
  Col,
  Statistic,
  Progress,
  Divider,
} from "antd";

const Billing = () => {

  // Payment History Table
  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoice",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Plan",
      dataIndex: "plan",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      invoice: "INV-2312",
      date: "01 Feb 2026",
      plan: "Premium",
      amount: "₹4999",
      status: "Paid",
    },
    {
      key: 2,
      invoice: "INV-2210",
      date: "01 Jan 2026",
      plan: "Premium",
      amount: "₹4999",
      status: "Paid",
    },
  ];

  return (
    <div style={{ padding: 20 }}>

      {/* Subscription Overview */}
      <Card title="Subscription Overview" style={{ marginBottom: 20 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="Current Plan" value="Premium" />
          </Col>

          <Col span={6}>
            <Statistic title="Billing Cycle" value="Monthly" />
          </Col>

          <Col span={6}>
            <Statistic title="Next Billing Date" value="01 April 2026" />
          </Col>

          <Col span={6}>
            <Statistic title="Amount Due" value="₹4999" />
          </Col>
        </Row>
      </Card>

      {/* Organization Usage */}
      <Card title="Organization Usage" style={{ marginBottom: 20 }}>
        <Row gutter={16}>

          <Col span={6}>
            <Card>
              <Statistic title="Students Using System" value="1200 / 2000" />
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Statistic title="Teachers Using System" value="85 / 120" />
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Statistic title="Total Students" value={1850} />
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Statistic title="Storage Used" value="3.4GB / 10GB" />
            </Card>
          </Col>

        </Row>
      </Card>

      {/* Feature Usage */}
      <Card title="Feature Usage" style={{ marginBottom: 20 }}>

        <p>Classrooms Created</p>
        <Progress percent={64} />

        <p>Assignments Uploaded</p>
        <Progress percent={35} />

        <p>Courses Created</p>
        <Progress percent={50} />

        <p>Parent Accounts</p>
        <Progress percent={25} />

      </Card>

      {/* Payment History */}
      <Card title="Payment History">
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>

    </div>
  );
};

export default Billing;