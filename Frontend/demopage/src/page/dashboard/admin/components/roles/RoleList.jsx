import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import API from '../../../../../services/api';
import RoleForm from './RoleForm';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await API.get('/roles');
      setRoles(res.data || []);
    } catch (err) {
      console.warn('Roles API not ready, using empty list', err);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/roles/${id}`);
      message.success('Designation deleted');
      fetchRoles();
    } catch  {
      message.error('Delete failed');
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing && editing._id) {
        await API.put(`/roles/${editing._id}`, values);
        message.success('Designation updated');
      } else {
        await API.post('/roles', values);
        message.success('Designation created');
      }
      setModalOpen(false);
      fetchRoles();
    } catch (err) {
      console.error(err);
      message.error('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { title: '#', dataIndex: 'index', key: 'index', render: (_, __, i) => i + 1 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Code', dataIndex: 'code', key: 'code', render: (c) => c || '—' },
    { title: 'Description', dataIndex: 'description', key: 'description', render: (d) => d || '—' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag>{t || 'General'}</Tag> },
    {
      title: 'Actions', key: 'actions', render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Designations</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>New Designation</Button>
      </div>

      <Table
        dataSource={roles}
        columns={columns}
        rowKey={(r) => r._id || r.id || r.name}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editing ? 'Edit Designation' : 'New Designation'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <RoleForm initialValues={editing || {}} onCancel={() => setModalOpen(false)} onSubmit={handleSubmit} submitting={submitting} />
      </Modal>
    </div>
  );
};

export default RoleList;
