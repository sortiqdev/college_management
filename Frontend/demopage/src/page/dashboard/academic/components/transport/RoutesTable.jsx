/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import API from "../../../../../services/api"; // adjust path if needed

const RoutesTable = () => {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Route Name",
      dataIndex: "route"
    },
    {
      title: "Bus Number",
      dataIndex: "bus"
    },
    {
      title: "Pickup Time",
      dataIndex: "time"
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button danger>
          Delete
        </Button>
      )
    }
  ];

  const onFinish = async (values) => {

    try {

      setLoading(true);

      const payload = {
        route_name: values.route,
        bus_number: values.bus,
        pickup_time: values.time
      };

      const res = await API.post("/transport/routes", payload);

      if (res.data.status) {

        message.success("Route created successfully");

        setData([...data, values]);

        setOpen(false);

      }

    } catch (error) {

      message.error(`"Failed to create route"${error.message}`);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div>

      <Button type="primary" onClick={() => setOpen(true)}>
        Add Route
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="route"
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Create Bus Route"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >

        <Form onFinish={onFinish} layout="vertical">

          <Form.Item
            name="route"
            label="Route Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Route 5"/>
          </Form.Item>

          <Form.Item
            name="bus"
            label="Bus Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Bus 1"/>
          </Form.Item>

          <Form.Item
            name="time"
            label="Pickup Time"
            rules={[{ required: true }]}
          >
            <Input placeholder="7:30 AM"/>
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            block
          >
            Save Route
          </Button>

        </Form>

      </Modal>

    </div>
  );
};

export default RoutesTable;