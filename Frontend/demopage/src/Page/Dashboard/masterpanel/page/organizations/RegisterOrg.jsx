import { Form, Input, Select, Button, Card, Row, Col } from "antd";
import API from "../../../../../services/api";

const { Option } = Select;

export default function RegisterOrg() {
  console.log("Rendering RegisterOrg component");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Form Data:", values);
     try {
    const res = await API.post("organizations", values);

    alert(res.data.message);
    console.log(res.data);
  } catch (error) {
    console.error(error.response?.data);
    alert(error.response?.data?.message || "Error occurred");
  }
  };

  return (
    <Card title="Register New Organization" style={{ borderRadius: 10 }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        {/* Organization Info */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Organization Name"
              name="orgname"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter organization name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Organization Code"
              name="orgcode"
              rules={[{ required: true }]}
            >
              <Input placeholder="Unique code (e.g. SCH001)" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="orgemail"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Organization email" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Organization Phone" name="orgphone">
              <Input placeholder="Organization number" />
            </Form.Item>
          </Col>
        </Row>

        {/* Address */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Country" name="country">
              <Input placeholder="Country" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="State" name="state">
              <Input placeholder="State" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="City" name="city">
              <Input placeholder="City" />
            </Form.Item>
          </Col>
        </Row>

        {/* Admin Info */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Admin Name"
              name="adminname"
              rules={[{ required: true }]}
            >
              <Input placeholder="Admin full name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Admin Email"
              name="adminemail"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Admin email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Admin Password"
              name="adminpassword"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Create password" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Select Plan" namtye="plan">
              <Select placeholder="Choose subscription plan">
                <Option value="basic">Basic</Option>
                <Option value="pro">Pro</Option>
                <Option value="enterprise">Enterprise</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Register Organization
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
