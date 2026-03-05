import React from 'react';
import { Form, Input, Button, Space } from 'antd';

const RoleForm = ({ initialValues = {}, onCancel, onSubmit, submitting }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Form form={form} layout="vertical" onFinish={(values) => onSubmit(values)}>
      <Form.Item
        label="Designation Name"
        name="name"
        rules={[{ required: true, message: 'Please enter designation name' }]}
      >
        <Input placeholder="e.g. Senior Lecturer / Accountant" />
      </Form.Item>

      <Form.Item label="Code" name="code">
        <Input placeholder="Optional code" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} placeholder="Short description (optional)" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button onClick={() => { form.resetFields(); onCancel && onCancel(); }}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={submitting}>Save</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RoleForm;
