import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  DatePicker,
  Divider,
  Row,
  Col,
  Switch,
  message,
} from "antd";
import {
  UserAddOutlined,
  LockOutlined,
} from "@ant-design/icons";

const UserCreate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const selectedRole = Form.useWatch("role", form);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
        department: values.department,
        registrationNumber: values.registrationNumber || null,

        parentInfo:
          values.role === "student"
            ? {
                parentName: values.parentName,
                parentPhone: values.parentPhone,
              }
            : null,

        hostel:
          values.hostel === true
            ? {
                roomNumber: values.roomNumber,
                block: values.block,
              }
            : null,

        busService:
          values.busService === true
            ? {
                routeNumber: values.routeNumber,
                pickupPoint: values.pickupPoint,
              }
            : null,

        password: values.password,
      };

      console.log("Payload to send:", payload);

      // EMPTY API (Replace later)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("User Created Successfully");
      form.resetFields();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card
        title="Create User"
        className="rounded-2xl shadow-md"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          {/* BASIC INFO */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* ROLE */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true }]}
              >
                <Select
                  size="large"
                  options={[
                    { label: "Student", value: "student" },
                    { label: "Teacher", value: "teacher" },
                    { label: "Admin", value: "admin" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* REGISTRATION NUMBER */}
          {(selectedRole === "student" ||
            selectedRole === "teacher") && (
            <Form.Item
              label="Registration Number"
              name="registrationNumber"
              rules={[{ required: true }]}
            >
              <Input size="large" />
            </Form.Item>
          )}

          {/* PARENT INFO - ONLY STUDENT */}
          {selectedRole === "student" && (
            <>
              <Divider />
              <h3>Parent Information</h3>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Parent Name"
                    name="parentName"
                    rules={[{ required: true }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Parent Phone"
                    name="parentPhone"
                    rules={[{ required: true }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {/* HOSTEL & BUS SECTION */}
          {(selectedRole === "student" ||
            selectedRole === "teacher") && (
            <>
              <Divider />
              <h3>Additional Services</h3>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Hostel Required?"
                    name="hostel"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Bus Service Required?"
                    name="busService"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              {/* HOSTEL DETAILS - DYNAMIC */}
              <Form.Item shouldUpdate>
                {() =>
                  form.getFieldValue("hostel") ? (
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Room Number"
                          name="roomNumber"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Block"
                          name="block"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>

              {/* BUS DETAILS - DYNAMIC */}
              <Form.Item shouldUpdate>
                {() =>
                  form.getFieldValue("busService") ? (
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Route Number"
                          name="routeNumber"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Pickup Point"
                          name="pickupPoint"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>
            </>
          )}

          <Divider />

          {/* PASSWORD */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, min: 8 }]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Create User
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UserCreate;